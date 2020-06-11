import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Category, Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSub: Subscription;
  categories: Category[] = [];
  categoriesSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.categoriesSub = this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostByID(params['id']);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        categories: new FormControl(post.categories),
        aboutPost: new FormControl(post.aboutPost, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSub = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      aboutPost: this.form.value.aboutPost,
      categories: this.form.value.categories,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Post was changed!');
    });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }

    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe()
    }
  }
}

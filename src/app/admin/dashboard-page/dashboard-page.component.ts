import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/post.service';
import { Category, Post } from '../../shared/interfaces';
import { forkJoin, Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { strict } from 'assert';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  categories: Category[] = [];
  joinSub: Subscription;
  searchStr = '';
  deleteSub: Subscription;

  constructor(private postsService: PostsService, private alertService: AlertService, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.joinSub = forkJoin(this.postsService.getAll(), this.categoriesService.getAllCategories()).subscribe(([posts, categories]) => {
      this.posts = posts.filter((post: Post) => {
        return post.user === localStorage.getItem('uid');
      });
      this.posts.forEach(post => {
        const categoriesList = [];
        post.categories.forEach(id => {
          const category = categories.find(category => category.id === id);
          categoriesList.push(category);
        });
        post.categories = categoriesList;
      });
    });
  }

  remove(id: string) {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Post was deleted!');
    });
  }

  ngOnDestroy() {
    if (this.joinSub) {
      this.joinSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}

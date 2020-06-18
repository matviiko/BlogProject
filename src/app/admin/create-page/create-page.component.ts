import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category, Post } from "../../shared/interfaces";
import { PostsService } from "../../shared/post.service";
import { AlertService } from "../shared/services/alert.service";
import { CategoriesService } from "../../shared/services/categories.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories: Category[] = [];
  categoriesSub: Subscription;

  constructor(private postsService: PostsService, private alertService: AlertService, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesSub = this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      categories: new FormControl(null),
      img: new FormControl(null, Validators.required),
      aboutPost: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      img: this.form.value.img,
      categories: this.form.value.categories,
      aboutPost: this.form.value.aboutPost,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success("Post was created!");
    });
  }

  ngOnDestroy() {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }
}

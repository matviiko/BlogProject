import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../post.service';
import { Category, Post } from '../../interfaces';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from '../../../admin/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [],
})
export class MainLayoutComponent implements OnInit {
  posts: Array<Post> = [];
  categories: Array<Category>;

  constructor(private postsService: PostsService, private categoriesService: CategoriesService, public authService: AuthService) {}

  ngOnInit() {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });

    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}

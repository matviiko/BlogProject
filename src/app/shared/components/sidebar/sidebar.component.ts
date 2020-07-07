import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';
import { Category, Post } from '../../interfaces';
import { PostsService } from '../../post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input('sidebarPosts') posts: Array<Post>;
  categories$: Observable<Category[]>;
  latestPosts: Array<Post>;

  constructor(private postsService: PostsService, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.postsService.getAll().subscribe(posts => {
      this.latestPosts = posts.slice(0, 3);
    });

    this.categories$ = this.categoriesService.getAllCategories();
  }
}

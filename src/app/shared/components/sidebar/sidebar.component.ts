import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {Observable} from 'rxjs';
import {Category, Post} from '../../interfaces';
import {PostsService} from '../../post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories$: Observable<Category[]>;
  posts$: Observable<Post[]>;
  posts: Array<Post>;

  constructor(
    private categoriesService: CategoriesService,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.getAllCategories();

    this.posts$ = this.postsService.getAll();

    this.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }

}

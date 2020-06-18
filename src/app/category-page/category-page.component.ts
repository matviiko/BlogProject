import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/post.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  posts$: Observable<Post[]>;
  categoryId = '';

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
    route.params.subscribe(params => (this.categoryId = params.id));
  }

  ngOnInit() {
    this.posts$ = this.postsService.getAll();
  }
}

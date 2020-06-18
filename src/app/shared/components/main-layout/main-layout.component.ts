import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../post.service';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [],
})
export class MainLayoutComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }
}

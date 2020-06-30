import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/post.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;
  idPost = '';

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private postsService: PostsService) {}

  ngOnInit() {
    this.post$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostByID(params['id']);
      })
    );

    this.idPost = this.activatedRoute.snapshot.params.id;
  }
}

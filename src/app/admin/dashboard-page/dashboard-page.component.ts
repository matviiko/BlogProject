import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSub: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });

  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

  remove(id: string) {

  }
}

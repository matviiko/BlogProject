import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post, ProfileUser } from '../../interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  user: ProfileUser;
  imgPost = './assets/image/image-analysis.png';
  counterComments: string | number;
  uSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.uSub = this.userService.getAllUsers().subscribe(users => {
      this.user = users.find(user => {
        return user.uid === this.post.user;
      });
    });

    if (this.post.img) {
      this.imgPost = this.post.img;
    }

    if (this.post.comments === undefined) {
      this.counterComments = 'NO';
    } else {
      this.counterComments = Object.keys(this.post.comments).length;
    }
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment, ProfileUser } from 'src/app/shared/interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  user: ProfileUser;
  uSub: Subscription;
  logo: any = 'https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/103180/bd74922c-7249-4dc7-9c08-87c973bbd0c7.png';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.user = users.find(user => user.uid === this.comment.user);
      if (this.user.logoSrc) {
        this.logo = this.user.logoSrc;
      }
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}

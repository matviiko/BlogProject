import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces';
import { AuthService } from '../../../admin/shared/services/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  form: FormGroup;
  @Input() id;

  constructor(private commentService: CommentService, public authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const comment: Comment = {
      comment: this.form.value.comment,
      date: new Date(),
      user: localStorage.getItem('uid'),
    };

    return this.commentService.create(this.id, comment).subscribe(() => {
      this.form.reset();
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post

  imgPost = './assets/image/image-analysis.png'

  constructor() { }

  ngOnInit() {
    if (this.post.img) {
      this.imgPost = this.post.img
    }
  }

}

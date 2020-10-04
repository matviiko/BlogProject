import {
  Component,
  OnInit,
} from '@angular/core';
import {PostsService} from "../shared/post.service";
import {Post} from "../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'tests-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  posts: Array<Post>
  searchWord: string
  resultPosts = []

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchWord = params['word']

      if (this.searchWord.trim() === '') {
        this.resultPosts = []
        this.router.navigate([''])
      } else {

        this.postsService.getAll().subscribe(posts => {
          this.posts = posts

          this.resultPosts = this.posts.filter(post => {
            return post.title.toLowerCase().includes(this.searchWord.toLowerCase())
          })
        })

      }

    })

  }

}

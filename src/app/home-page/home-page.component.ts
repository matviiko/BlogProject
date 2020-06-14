import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {Post} from '../shared/interfaces';
import {PostsService} from '../shared/post.service';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Array<Post> = [];
  joinSub: Subscription;


  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.joinSub = forkJoin(
      this.postsService.getAll(),
      this.categoriesService.getAllCategories()
    ).subscribe(([posts, categories]) => {
      this.posts = posts;
      this.posts.forEach(post => {
        const categoriesList = [];
        post.categories.forEach(id => {
          const category = categories.find(category => category.id === id);
          categoriesList.push(category);
        });
        post.categories = categoriesList;
      });
    });
  }

  ngOnDestroy() {
    if (this.joinSub) {
      this.joinSub.unsubscribe();
    }
  }

}

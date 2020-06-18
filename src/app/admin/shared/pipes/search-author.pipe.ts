import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../../shared/interfaces';

@Pipe({
  name: 'searchPostsAuthor',
})
export class SearchAuthorPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter(post => {
      return post.author.toUpperCase().includes(search.toUpperCase());
    });
  }
}

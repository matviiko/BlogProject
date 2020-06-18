import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces';

@Pipe({
  name: 'filterCategory',
})
export class FilterCategoryPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter(post => {
      return post.categories.includes(search);
    });
  }
}

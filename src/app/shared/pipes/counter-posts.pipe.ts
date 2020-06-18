import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../interfaces";

@Pipe({
  name: "counterPosts",
})
export class CounterPostsPipe implements PipeTransform {
  transform(posts: Post[], idCategory: string): number {
    const resultPosts = posts.filter(post => post.categories.includes(idCategory));
    return resultPosts.length;
  }
}

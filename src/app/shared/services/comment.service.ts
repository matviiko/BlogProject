import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fbCreateResponse, Comment } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  create(idPost: string, comment: Comment): Observable<Comment> {
    return this.http
      .post(`${environment.fbDbUrl}/posts/${idPost}/comments.json`, comment) // чомусь тип comment не приймав після оператора мап
      .pipe(
        map((response: fbCreateResponse) => {
          return {
            ...comment,
            id: response.name,
            date: new Date(comment.date),
          };
        })
      );
  }
}

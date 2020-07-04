import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ProfileUser[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key,
        }));
      })
    );
  }

  update(profile: ProfileUser): Observable<ProfileUser> {
    return this.http.patch<ProfileUser>(`${environment.fbDbUrl}/users/${profile.id}.json`, profile);
  }
}

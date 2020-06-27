import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fbAuthResponse, fbUserResponse, User } from '../../../shared/interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    //  отримуємо токен з локал-сторедж якщо час закінчився викидуємо і чистимо токен
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  get uid(): string {
    return localStorage.getItem('uid');
  }

  register(user): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  createUser(user): Observable<fbUserResponse> {
    return this.http.post(`${environment.fbDbUrl}/users/.json`, user).pipe(
      map(() => {
        return {
          ...user,
        };
      })
    );
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Not correct Email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Not correct Password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('The email address is already in use by another account');
        break;
      case 'OPERATION_NOT_ALLOWED':
        this.error$.next('Password sign-in is disabled for this project');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.error$.next('We have blocked all requests from this device due to unusual activity. Try again later');
        break;
    }
    return throwError(error);
  }

  private setToken(response: fbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('uid', response.localId);
    } else {
      localStorage.clear();
    }
  }
}

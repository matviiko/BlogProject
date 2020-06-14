export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface fbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title: string;
  categories: Array<string>;
  img?: string;
  aboutPost?: string;
  text: string;
  author: string;
  date: Date;
}

export interface fbCreateResponse {
  name: string;
}

export interface Category {
  id?: string;
  name: string;
  user?: string;
  date: Date;
}

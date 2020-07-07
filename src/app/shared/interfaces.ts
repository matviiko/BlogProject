export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface fbUserResponse {
  uid: string;
  email: string;
}

export interface fbAuthResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
  email: string;
}

export interface Post {
  id?: string;
  title: string;
  categories: Array<string>;
  user: string;
  comments?: object;
  img?: string;
  aboutPost?: string;
  text: string;
  author?: string;
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

export interface Comment {
  id?: string;
  user: string;
  comment: string;
  date: Date;
}

export interface ProfileUser {
  uid: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  country?: string;
  id?: string;
  logoSrc?: File;
}

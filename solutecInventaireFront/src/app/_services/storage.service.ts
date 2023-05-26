import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_LOGIN = "login-user"

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveLogin(login: any): any {
    window.sessionStorage.removeItem(USER_LOGIN);
    window.sessionStorage.setItem(USER_LOGIN, login)
  }

  public getLoginUser(): any {
    const log = window.sessionStorage.getItem(USER_LOGIN)
    return log;
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
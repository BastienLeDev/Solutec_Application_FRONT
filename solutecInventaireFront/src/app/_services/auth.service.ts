import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";


export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(login : string, password:string) {
    return this.httpClient
      .post<any>("http://localhost:8301/authenticate", { login, password })

      
      .pipe(
        map((userData: { token: string; })  => {
          console.log("authenticate");
          console.log(userData);
          
          
          sessionStorage.setItem("login", login);
          let tokenStr = userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("login");
  }
}
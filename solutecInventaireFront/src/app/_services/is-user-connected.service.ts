import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsUserConnectedService {

  constructor() { }

  
  isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    return !(user === null);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private route: Router, private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost:8301/authenticate',
      {
        'login': username,
        'password':password,
      },
      httpOptions
    );
  }
  logout() {
    return this.http.post('http://localhost:8301/logout', { }, httpOptions);
  }

}

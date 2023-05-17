import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('login') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
    }
    console.log(sessionStorage.getItem('token'));
    
    console.log(req.headers);
    return next.handle(req);

  }
}
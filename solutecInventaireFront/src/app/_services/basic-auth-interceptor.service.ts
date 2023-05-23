import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('login') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
    }
    return next.handle(req);

  }
}
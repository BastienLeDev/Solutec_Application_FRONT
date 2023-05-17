import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {
  redirect: boolean;
  constructor() { }


  setNameProductToRedirect(product: any) {
    
    localStorage.setItem('nameProduct', JSON.stringify(product));
    

  }

  setToRedirect(){
    this.redirect = true;
    localStorage.setItem('toRedirect', JSON.stringify(this.redirect));
  }
  setToRedirectFalse(){
    this.redirect = false;
    localStorage.setItem('toRedirect', JSON.stringify(this.redirect));
  }


  getNameProductToRedirect() {
    let product: any = localStorage.getItem('nameProduct');
    return JSON.parse(product);
  }

  getToRedirect(){
    let toRedirect: any = localStorage.getItem('toRedirect');
    return JSON.parse(toRedirect);
  }

}

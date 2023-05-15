import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  form: any = {
    login: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private http: HttpClient, private route: Router, private authService: AuthService, private storageService: StorageService){}


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
  

  onSubmit(): void {
    const { login, password } = this.form;
    console.log(login);
    console.log(password);
    console.log(this.form);
    console.log(this.errorMessage);
        
        this.errorMessage = '';
        console.log(this.errorMessage);
    
    this.authService.login(login, password).subscribe({
      next: data => {
        console.log(this.errorMessage);
        
        this.errorMessage = '';
        console.log(this.errorMessage);
        
        console.log(data);
        
        this.storageService.saveUser(data);
        console.log(this.storageService.getUser());
        
        console.log("ok");
        

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.ngOnInit();
      },
      error: err => {
        console.log("erreur");
        console.log(err);
        
        if(err!=null){
          this.errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect";
        }
        
        this.isLoginFailed = true;
        this.ngOnInit();
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }

  logout(){
    this.authService.logout();
    console.log(this.storageService.getUser());
    
  }

}

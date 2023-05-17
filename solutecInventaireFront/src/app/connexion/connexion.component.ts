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
    this.errorMessage = '';
    
    this.authService.authenticate(login, password).subscribe({
      next: (data: any) => {
        this.errorMessage = '';
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.route.navigateByUrl('accueil')
      },
      error: (err: any) => {
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

  

}

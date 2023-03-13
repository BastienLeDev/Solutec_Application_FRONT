import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  user: any;
  msgErr = '';

  constructor(private http: HttpClient, private route: Router, private authService: AuthService){}

  connexion(val: any) {
    this.http.post('http://localhost:8301/user', val).subscribe({
      next: (data) => {
        this.user = data;
        if (this.user != null) {
          this.authService.setUserSession(this.user);
          this.route.navigateByUrl('accueil');
        } else {
          this.msgErr = 'Identifiant ou mot de passe incorrect';
        }
      },
      error: (err) => { console.log(err) },

    })
  }

}

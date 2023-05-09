import { Component, OnInit } from '@angular/core';
import { NotifService } from './notif.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notification: any;
  length: any;
  constructor(private NotifService: NotifService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {

    this.NotifService.getNotifs().subscribe(data => {
      this.notification = data;
      this.length = this.notification.length
    })

  }

  deleteNotifs(val: any) {
    this.http.delete('http://localhost:8301/deleteNotification/' + val).subscribe({
      next: (data) => {
        this.ngOnInit()
      },
      error: (err) => { console.log(err); }

    })
  }

  goToAlerte() {
    this.route.navigateByUrl('alertes');
  }

  title = 'solutecInventaireFront';
}

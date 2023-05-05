import { Component, OnInit } from '@angular/core';
import { NotifService } from './notif.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notification: any;
  constructor(private NotifService: NotifService, private route: Router) { }

  ngOnInit(): void {
    this.NotifService.getNotifs().subscribe(data => {
      this.notification = data;
    })
    console.log(this.notification)
  }

  goToAlerte() {
    this.route.navigateByUrl('alertes');
  }

  title = 'solutecInventaireFront';
}

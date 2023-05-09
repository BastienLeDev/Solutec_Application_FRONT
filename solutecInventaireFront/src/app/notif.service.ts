import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotifService {
  private apiUrl = 'http://localhost:8301/notification';

  constructor(private http: HttpClient) { }

  getNotifs():
    Observable<any> {
    return this.http.get<any>(this.apiUrl);

  }

}

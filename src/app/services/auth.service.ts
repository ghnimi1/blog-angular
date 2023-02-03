import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');
  login(user: IUser) {
    return this.http.post<any>(this.url + '/auth/login', user);
  }
  register(user: IUser) {
    return this.http.post<any>(this.url + '/auth/register', user);
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  currentUser = () => {
    return this.http.get<any>(this.url + '/auth/current', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  };
  getUser = (id: any): Observable<IUser> => {
    return this.http.get<any>(this.url + '/auth/' + id, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  };
}

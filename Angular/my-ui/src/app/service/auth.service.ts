import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  public getWsBaseUrl() {
    return environment.apiUrl;
  }

  login(userCredentials:any): Observable<any> {
    return this.http.post(this.getWsBaseUrl()+'/users/login',userCredentials);
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}

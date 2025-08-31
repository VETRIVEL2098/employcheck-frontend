import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getWsBaseUrl() {
    return environment.apiUrl;
  }

  fetchUser(userId:any): Observable<any> {
    return this.http.get(`${this.getWsBaseUrl()}/users/${userId}`).pipe(
      delay(1000)
    );;
  }

  fetchAllUser(): Observable<any> {
    return this.http.get(`${this.getWsBaseUrl()}/users`).pipe(
      delay(1000)
      );;
  }
  updateUserStatus(user_id:any,status:any): Observable<any> {
    return this.http.post(`${this.getWsBaseUrl()}/users/statuschange`,{status:status,user_id,}).pipe(
      delay(1000)
      );;
  }
}

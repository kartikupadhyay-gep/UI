import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { ICurrentuser } from '../interfaces/icurrentuser';
import { CookieService } from 'ngx-cookie-service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  url = env.apiUrl  + '/api/auth/users/';

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  login(userData: IUser): Observable<{ token : string }> {
    return this.httpClient.post<{ token: string }>(this.url + 'login', userData, this.httpOptions).pipe(catchError(this.handleError));
  }

  signup(userData: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url + 'add', userData, {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
    responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  }

  currentUser(): Observable<ICurrentuser> {
    return this.httpClient.get<ICurrentuser>(this.url + 'currentUser', this.httpOptions).pipe(catchError(this.handleError));
  }

  getUser(username: string): Observable<any> {
    return this.httpClient.get<any>(this.url + username, this.httpOptions).pipe(catchError(this.handleError));
  }

  updateUser(id: string, userData: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.url + "update/" + id, userData, {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
    responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.url + "delete/" + id, {
    headers: new HttpHeaders({'Content-Type':'application/json'}),
    responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errMsg = error.status + '\n' + error.statusText + '\n' + error.message;
    alert(errMsg);
    return throwError(() => {new Error(errMsg)});
  }

  saveToken(token: string): void {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + 60 * 60 * 1000);
    this.cookieService.set('jwt', token, expiry);
  }
  
  saveIdentity(role: string): void {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + 60 * 60 * 1000);
    this.cookieService.set('role', role, expiry);
  }

  getToken(): string {
    return this.cookieService.get('jwt');
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICourse } from '../interfaces/icourse';

@Injectable({
  providedIn: 'root'
})
export class Enrollment {
  url = "https://localhost:7038/api/students/";

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private httpClient: HttpClient) {}

  enrollStudent(id: string, courseIds: string[]): Observable<any> {
    return this.httpClient.post<any>(this.url + id + '/enroll', courseIds, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  };

  unrollStudent(id: string, courseIds: string[]): Observable<any> {
    return this.httpClient.delete<any>(this.url + id + '/unroll', {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      body: courseIds,
      responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  };

  courses(id: string): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(this.url + id + '/courses', this.httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errMsg = error.status + '\n' + error.statusText + '\n' + error.message;
    alert(errMsg);
    return throwError(() => {new Error(errMsg)});
  }
}

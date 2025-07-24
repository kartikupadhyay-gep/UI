import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICourse } from '../interfaces/icourse';

@Injectable({
  providedIn: 'root'
})
export class Course {
  url = "https://localhost:7038/api/courses/";

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(this.url, this.httpOptions).pipe(catchError(this.handleError));
  }

  getCourse(id: string): Observable<ICourse> {
    return this.httpClient.get<ICourse>(this.url + id, this.httpOptions).pipe(catchError(this.handleError));
  }

  addCourse(courseData: ICourse): Observable<any> {
    return this.httpClient.post<any>(this.url, courseData, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    });
  }

  updateCourse(id: string, updatedCourse: ICourse): Observable<any> {
    return this.httpClient.put<any>(this.url + id, updatedCourse, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    });
  }
  
  deleteCourse(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.url + id, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    });
  }

  handleError(error: HttpErrorResponse) {
    let errMsg = error.status + '\n' + error.statusText + '\n' + error.message;
    alert(errMsg);
    return throwError(() => {new Error(errMsg)});
  }
}

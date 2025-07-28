import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IStudent } from '../interfaces/istudent';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Student {
  url = env.apiUrl + "/api/students/";

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(this.url, this.httpOptions).pipe(catchError(this.handleError));
  }

  getStudent(id: string): Observable<IStudent> {
    return this.httpClient.get<IStudent>(this.url + id, this.httpOptions).pipe(catchError(this.handleError));
  }

  addStudent(studentData: IStudent): Observable<any> {
    return this.httpClient.post<any>(this.url, studentData, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    });
  }

  updateStudent(id: string, updatedStudent: IStudent): Observable<any> {
    return this.httpClient.put<any>(this.url + id, updatedStudent, {
      headers: new HttpHeaders({'Content-Type':'application/json'}),
      responseType: 'text' as 'json'
    });
  }
  
  deleteStudent(id: string): Observable<any> {
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

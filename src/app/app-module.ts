import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Create } from './api/course/create/create';
import { Read } from './api/course/read/read';
import { ReadOne } from './api/course/read-one/read-one';
import { Update } from './api/course/update/update';
import { Delete } from './api/course/delete/delete';
import { Create as CreateStudent } from './api/student/create/create';
import { Read as ReadStudent } from './api/student/read/read';
import { ReadOne as ReadOneStudent } from './api/student/read-one/read-one';
import { Update as UpdateStudent } from './api/student/update/update';
import { Delete as DeleteStudent } from './api/student/delete/delete';
import { Login } from './api/auth/login/login';
import { Signup } from './api/auth/signup/signup';
import { CurrentUser } from './api/auth/current-user/current-user';
import { Enroll } from './api/enrollment/enroll/enroll';
import { Unroll } from './api/enrollment/unroll/unroll';
import { Courses as EnrolledCourses } from './api/enrollment/courses/courses';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt-interceptor';
import { GetUser } from './api/auth/get-user/get-user';
import { Home } from './api/home/home';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Students } from './components/students/students';
import { Enrollment } from './components/enrollment/enrollment';
import { Courses } from './components/courses/courses'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    App,
    Create,
    Read,
    Update,
    Delete,
    Login,
    Signup,
    CurrentUser,
    Enroll,
    Unroll,
    Courses,
    GetUser,
    Home,
    Students,
    Enrollment,
    EnrolledCourses,
    CreateStudent,
    ReadStudent,
    UpdateStudent,
    DeleteStudent,
    ReadOne,
    ReadOneStudent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    DatePipe,
    DragDropModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    CookieService
  ],
  bootstrap: [App]
})
export class AppModule { }

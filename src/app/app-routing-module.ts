import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Read as ReadStudent } from './api/student/read/read';
import { ReadOne as ReadOneStudent } from './api/student/read-one/read-one';
import { Create as CreateStudent } from './api/student/create/create';
import { Update as UpdateStudent } from './api/student/update/update';
import { Delete as DeleteStudent } from './api/student/delete/delete';
import { Read as ReadCourse } from './api/course/read/read';
import { ReadOne as ReadOneCourse } from './api/course/read-one/read-one';
import { Create as CreateCourse } from './api/course/create/create';
import { Update as UpdateCourse } from './api/course/update/update';
import { Delete as DeleteCourse } from './api/course/delete/delete';
import { Update as UpdateUser } from './api/user/update/update';
import { Delete as DeleteUser } from './api/user/delete/delete';
import { Login } from './api/auth/login/login';
import { Signup } from './api/auth/signup/signup';
import { CurrentUser } from './api/auth/current-user/current-user';
import { Enroll } from './api/enrollment/enroll/enroll';
import { Unroll } from './api/enrollment/unroll/unroll';
import { Courses as EnrolledCourses } from './api/enrollment/courses/courses';
import { GetUser } from './api/auth/get-user/get-user';
import { authGuard } from './guards/auth-guard';
import { unauthGuard } from './guards/unauth-guard';
import { Home } from './api/home/home';
import { Students } from './components/students/students';
import { Courses } from './components/courses/courses';
import { Enrollment } from './components/enrollment/enrollment';

const routes: Routes = [
  {path:'', component:Home},
  {path:'students', component:Students, canActivate:[authGuard]},
  {path:'courses', component:Courses, canActivate:[authGuard]},
  {path:'enrollment', component:Enrollment, canActivate:[authGuard]},

  {path:'login', component:Login, canActivate:[unauthGuard]},
  {path:'sign-up', component:Signup},
  {path:'currentUser', component:CurrentUser, canActivate:[authGuard]},
  {path:'get-user', component:GetUser, canActivate:[authGuard]},

  {path:'allStudents', component:ReadStudent, canActivate:[authGuard]},
  {path:'allCourses', component:ReadCourse, canActivate:[authGuard]},

  {path:'singleStudent/:id', component:ReadOneStudent, canActivate:[authGuard]},
  {path:'singleCourse/:id', component:ReadOneCourse, canActivate:[authGuard]},

  {path:'addStudent', component:CreateStudent, canActivate:[authGuard]},
  {path:'addCourse', component:CreateCourse, canActivate:[authGuard]},

  {path:'updateStudent/:id', component:UpdateStudent, canActivate:[authGuard]},
  {path:'updateCourse/:id', component:UpdateCourse, canActivate:[authGuard]},
  {path:'updateUser/:id', component:UpdateUser, canActivate:[authGuard]},

  {path:'deleteStudent/:id', component:DeleteStudent, canActivate:[authGuard]},
  {path:'deleteCourse/:id', component:DeleteCourse, canActivate:[authGuard]},
  {path:'deleteUser/:id', component:DeleteUser, canActivate:[authGuard]},

  {path:':id/enroll', component:Enroll, canActivate:[authGuard]},
  {path:':id/unroll', component:Unroll, canActivate:[authGuard]},
  {path:':id/courses', component:EnrolledCourses, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ICurrentuser } from '../../interfaces/icurrentuser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-enrollment',
  standalone: false,
  templateUrl: './enrollment.html',
  styleUrls: ['./enrollment.css']
})
export class Enrollment implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: Auth, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
  }

  viewCourses(studentId: string): void {
    this.router.navigate(['/', studentId, 'courses']);
  }

  enrollStudent(studentId: string): void {
    this.router.navigate(['/', studentId, 'enroll']);
  }

  unenrollStudent(studentId: string): void {
    this.router.navigate(['/', studentId, 'unroll']);
  }
}

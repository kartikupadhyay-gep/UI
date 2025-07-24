import { Component } from '@angular/core';
import { ICourse } from '../../../interfaces/icourse';
import { Course } from '../../../services/course';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-course',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  isAdmin: boolean = false;

  courseData: ICourse = {
    title: '',
    courseId: '',
    credits: 0,
    description: '',
  }

  constructor(private courseService: Course, private authService: Auth, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
  }

  onSubmit(): void {
    if (this.isAdmin) {
      this.courseService.addCourse(this.courseData).subscribe({
        next: (res: any) => {
          alert(`${res} for ${this.courseData.title} as ${this.courseData.courseId}`);
          this.router.navigate(['/allCourses']);
        }, 
        error: (error: any) => {
          console.error('Error creating student:', error);
          alert('Error creating student: ' + error.error.message);
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { ICourse } from '../../../interfaces/icourse';
import { Course } from '../../../services/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update.html',
  styleUrl: './update.css'
})
export class Update {
  isAdmin: boolean = false;
  courseId: string = '';

  updatedCourse: ICourse = {
    courseId: '',
    title: '',
    description: '',
    credits: 0
  };

  constructor(
    private courseService: Course, 
    private router: Router, 
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
    this.courseId = this.route.snapshot.paramMap.get('id') || '';

    if (this.isAdmin && this.courseId) {
      this.courseService.getCourse(this.courseId).subscribe({
        next: (res: ICourse) => {
          this.updatedCourse = res;
        },
        error: (error: any) => {
          console.log(`Error fetching Course data: ${error.message}`);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isAdmin) {
      this.courseService.updateCourse(this.courseId, this.updatedCourse).subscribe({
        next: (res: any) => {
          alert(`${res}`);
          this.router.navigate(['/allCourses']);
        }, 
        error: (error: any) => {
          alert(`Error updating Course: ${error.error.message || error.message}`);
        }
      });
    }
  }
}

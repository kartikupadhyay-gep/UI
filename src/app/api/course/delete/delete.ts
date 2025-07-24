import { Component } from '@angular/core';
import { ICourse } from '../../../interfaces/icourse';
import { Course } from '../../../services/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-delete-course',
  standalone: false,
  templateUrl: './delete.html',
  styleUrl: './delete.css'
})
export class Delete {
  isAdmin: boolean = false;
  courseId: string = '';

  courseData: ICourse = {
    id: '',
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
          this.courseData = res;
        },
        error: (error: any) => {
          console.log(`Error fetching Course data: ${error.message}`);
          this.router.navigate(['/Courses']); // Go back if Course not found
        }
      });
    }
  }

  onDelete(): void {
    if (this.isAdmin) {
      this.courseService.deleteCourse(this.courseId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/allCourses']);
        },
        error: (error: any) => {
          console.log(`Error deleting Course: ${error.error.message || error.message}`);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/Courses']);
  }
}

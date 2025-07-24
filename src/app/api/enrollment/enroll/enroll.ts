import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ICourse } from '../../../interfaces/icourse';
import { IStudent } from '../../../interfaces/istudent';
import { Enrollment } from '../../../services/enrollment';
import { Course } from '../../../services/course';
import { Student } from '../../../services/student';
import { Auth } from '../../../services/auth';
import { CookieService } from 'ngx-cookie-service';
import { ICurrentuser } from '../../../interfaces/icurrentuser';

@Component({
  selector: 'app-enroll',
  standalone: false,
  templateUrl: './enroll.html',
  styleUrl: './enroll.css'
})
export class Enroll implements OnInit {
  isAdmin: boolean = false;
  studentId: string = '';
  studentData: IStudent | null = null;

  currUser: ICurrentuser = {
    username: '',
    userId: '',
    identity: ''
  }
  
  allCourses: ICourse[] = [];
  availableCourses: ICourse[] = [];
  coursesToBeEnrolled: ICourse[] = [];

  constructor(
    private enrollmentService: Enrollment, 
    private studentService: Student, 
    private courseService: Course, 
    private authService: Auth,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    
    this.authService.currentUser().subscribe({
      next: (res: ICurrentuser) => {
        this.currUser = res;
        this.isAdmin = this.cookieService.get('role') === 'admin' || res.userId === this.studentId;

        if (this.isAdmin && this.studentId) {
          forkJoin({
            student: this.studentService.getStudent(this.studentId),
            courses: this.courseService.getCourses()
          }).subscribe({
            next: ({ student, courses }) => {
              this.studentData = student;
              this.allCourses = courses;
              if (student.courses && student.courses?.length > 0 ) {
                this.availableCourses = this.allCourses.filter(course => !student.courses?.includes(course.courseId));
              } else {
                this.availableCourses = this.allCourses;
              } 
            },
            error: (err) => {
              console.log(`Error fetching initial data: ${err.message}`);
            }
          });
        }
      },
      error: (error: any) => {
        console.log(`Error: ${error}`);
      }
    });
  }

  drop(event: CdkDragDrop<ICourse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onSubmit(): void {
    if (this.coursesToBeEnrolled.length === 0) {
      console.log('Please select at least one course to enroll.');
      return;
    }

    const courseIdsToEnroll = this.coursesToBeEnrolled.map(course => course.courseId);

    this.enrollmentService.enrollStudent(this.studentId, courseIdsToEnroll).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/', this.studentId, 'courses']);
      },
      error: (err) => {
        console.log(`Enrollment failed: ${err.error.message || err.message}`);
      }
    });
  }
}

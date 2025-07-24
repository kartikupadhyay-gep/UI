import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ICourse } from '../../../interfaces/icourse';
import { IStudent } from '../../../interfaces/istudent';
import { Enrollment } from '../../../services/enrollment';
import { Course } from '../../../services/course';
import { Student } from '../../../services/student';
import { CookieService } from 'ngx-cookie-service';
import { ICurrentuser } from '../../../interfaces/icurrentuser';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-unroll',
  standalone: false,
  templateUrl: './unroll.html',
  styleUrl: './unroll.css'
})
export class Unroll implements OnInit {
  isAdmin: boolean = false;
  studentId: string = '';
  studentData: IStudent | null = null;

  currUser: ICurrentuser = {
    username: '',
    userId: '',
    identity: ''
  }
  
  enrolledCourses: ICourse[] = [];
  coursesToBeUnenrolled: ICourse[] = [];

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
            allCourses: this.courseService.getCourses()
          }).subscribe({
            next: ({ student, allCourses }) => {
              this.studentData = student;
              const enrolledCourseIds = new Set(student.courses || []);
              this.enrolledCourses = allCourses.filter(course => enrolledCourseIds.has(course.courseId));
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
    if (this.coursesToBeUnenrolled.length === 0) {
      console.log('Please select at least one course to un-enroll.');
      return;
    }

    const courseIdsToUnenroll = this.coursesToBeUnenrolled.map(course => course.courseId);

    this.enrollmentService.unrollStudent(this.studentId, courseIdsToUnenroll).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/', this.studentId, 'courses']);
      },
      error: (err) => {
        console.log(`Un-enrollment failed: ${err.error.message || err.message}`);
      }
    });
  }
}

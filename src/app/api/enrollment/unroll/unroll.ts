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
  
  enrolledCourses: ICourse[] = [];
  coursesToBeUnenrolled: ICourse[] = [];

  constructor(
    private enrollmentService: Enrollment, 
    private studentService: Student, 
    private courseService: Course, 
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
    this.studentId = this.route.snapshot.paramMap.get('id') || '';

    if (this.isAdmin && this.studentId) {
      // Use forkJoin to get both student and all courses data simultaneously
      forkJoin({
        student: this.studentService.getStudent(this.studentId),
        allCourses: this.courseService.getCourses()
      }).subscribe({
        next: ({ student, allCourses }) => {
          this.studentData = student;
          const enrolledCourseIds = new Set(student.courses || []);
          
          // Filter the master list of courses to get full details for enrolled courses
          this.enrolledCourses = allCourses.filter(course => enrolledCourseIds.has(course.courseId));
        },
        error: (err) => {
          alert(`Error fetching initial data: ${err.message}`);
        }
      });
    }
  }

  // Handles the drag-and-drop event
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

  // Submits the un-enrollment request
  onSubmit(): void {
    if (this.coursesToBeUnenrolled.length === 0) {
      alert('Please select at least one course to un-enroll.');
      return;
    }

    const courseIdsToUnenroll = this.coursesToBeUnenrolled.map(course => course.courseId);

    this.enrollmentService.unrollStudent(this.studentId, courseIdsToUnenroll).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(['/', this.studentId, 'courses']);
      },
      error: (err) => {
        alert(`Un-enrollment failed: ${err.error.message || err.message}`);
      }
    });
  }
}

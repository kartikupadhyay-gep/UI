import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../services/course';
import { Student } from '../../../services/student';
import { IStudent } from '../../../interfaces/istudent';
import { ICourse } from '../../../interfaces/icourse';
import { Enrollment } from '../../../services/enrollment';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  studentId: string = '';

  studentData: IStudent = {
    id: '',
    name: '',
    email: '',
    studentId: '',
    dob: new Date(),
    courses: []
  };

  courses: ICourse[] = [];

  constructor(private studentService: Student, private enrollmentService: Enrollment, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    
    this.displayStudent(this.studentId);
    this.displayCoursesDetails(this.studentId);
  }

  displayStudent(id: string): void {
    this.studentService.getStudent(id).subscribe({
      next: (res: IStudent) => {
        this.studentData = res;
      }, 
      error: (error: any) => {
        alert(`Error: ${error}`);
      }
    });
  }

  displayCoursesDetails(studentId: string): void {
    this.enrollmentService.courses(studentId).subscribe({
      next: (res: ICourse[]) => {
        this.courses = res;
      },
      error: (error: any) => {
        alert(`Error: ${error}`);
      }
    });
  }
}

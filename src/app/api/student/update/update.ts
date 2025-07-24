import { Component, OnInit } from '@angular/core';
import { Student } from '../../../services/student';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../../../interfaces/istudent';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-student',
  standalone: false,
  templateUrl: './update.html',
  styleUrl: './update.css'
})
export class Update implements OnInit {
  isAdmin: boolean = false;
  studentId: string = '';

  updatedStudent: IStudent = {
    studentId: '',
    name: '',
    email: '',
    dob: new Date()
  };

  constructor(
    private studentService: Student, 
    private router: Router, 
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
    this.studentId = this.route.snapshot.paramMap.get('id') || '';

    if (this.isAdmin && this.studentId) {
      this.studentService.getStudent(this.studentId).subscribe({
        next: (res: IStudent) => {
          this.updatedStudent = res;
        },
        error: (error: any) => {
          console.log(`Error fetching student data: ${error.message}`);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isAdmin) {
      this.studentService.updateStudent(this.studentId, this.updatedStudent).subscribe({
        next: (res: any) => {
          console.log(`${res}`);
          this.router.navigate(['/allStudents']);
        }, 
        error: (error: any) => {
          console.log(`Error updating student: ${error.error.message || error.message}`);
        }
      });
    }
  }
}

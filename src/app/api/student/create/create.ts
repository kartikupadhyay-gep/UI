import { Component } from '@angular/core';
import { Student } from '../../../services/student';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { ICurrentuser } from '../../../interfaces/icurrentuser';
import { IStudent } from '../../../interfaces/istudent';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-student',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  isAdmin: boolean = false;

  studentData: IStudent = {
    name: '',
    studentId: '',
    email: '',
    dob: new Date(),
    courses: []
  }

  constructor(private studentService: Student, private authService: Auth, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('role') === 'admin';
  }

  onSubmit(): void {
    if (this.isAdmin) {
      this.studentService.addStudent(this.studentData).subscribe({
        next: (res: any) => {
          console.log(`${res} for ${this.studentData.name} as ${this.studentData.studentId}`);
          this.router.navigate(['/allStudents']);
        }, 
        error: (error: any) => {
          console.error('Error creating student:', error);
          console.log('Error creating student: ' + error.error.message);
        }
      });
    }
  }
}

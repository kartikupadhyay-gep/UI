import { Component, OnInit } from '@angular/core';
import { Student } from '../../../services/student';
import { IStudent } from '../../../interfaces/istudent';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-delete-student',
  standalone: false,
  templateUrl: './delete.html',
  styleUrl: './delete.css'
})
export class Delete implements OnInit {
  isAdmin: boolean = false;
  studentId: string = '';

  studentData: IStudent = {
    id: '',
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
          this.studentData = res;
        },
        error: (error: any) => {
          alert(`Error fetching student data: ${error.message}`);
          this.router.navigate(['/students']); // Go back if student not found
        }
      });
    }
  }

  onDelete(): void {
    if (this.isAdmin) {
      this.studentService.deleteStudent(this.studentId).subscribe({
        next: (res: any) => {
          alert(res);
          this.router.navigate(['/allStudents']);
        },
        error: (error: any) => {
          alert(`Error deleting student: ${error.error.message || error.message}`);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}

import { Component } from '@angular/core';
import { IStudent } from '../../../interfaces/istudent';
import { Student } from '../../../services/student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-one-student',
  standalone: false,
  templateUrl: './read-one.html',
  styleUrl: './read-one.css'
})
export class ReadOne {
  id: string = '';
  student: IStudent = {
    id: '',
    studentId: '',
    name: '',
    email: '',
    dob: new Date()
  };

  constructor(private studentService: Student, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.studentService.getStudent(this.id).subscribe({
      next: (res: IStudent) => {
        this.student = res;
      }, 
      error: (error: any) => {
        console.error('Error reading student:', error);
      }
    })
  }
}

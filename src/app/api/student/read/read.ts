import { Component } from '@angular/core';
import { Student } from '../../../services/student';
import { Router } from '@angular/router';
import { IStudent } from '../../../interfaces/istudent';

@Component({
  selector: 'app-read-student',
  standalone: false,
  templateUrl: './read.html',
  styleUrl: './read.css'
})
export class Read {
  students: IStudent[] = []

  constructor(private studentService: Student, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (res: IStudent[]) => {
        this.students = res;
      }, 
      error: (error: any) => {
        console.error('Error reading students:', error);
        console.log('Error reading students: ' + error.error.message);
      }
    })
  }
}

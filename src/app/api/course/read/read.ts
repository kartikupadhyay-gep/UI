import { Component } from '@angular/core';
import { ICourse } from '../../../interfaces/icourse';
import { Course } from '../../../services/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-course',
  standalone: false,
  templateUrl: './read.html',
  styleUrl: './read.css'
})
export class Read {
  courses: ICourse[] = [];

  constructor(private courseService: Course, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res: ICourse[]) => {
        this.courses = res;
      },
      error: (error: any) => {
        alert(`Failed to fetch the courses: ${error}`);
      }
    });
  }
}

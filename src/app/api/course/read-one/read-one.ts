import { Component } from '@angular/core';
import { ICourse } from '../../../interfaces/icourse';
import { Course } from '../../../services/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-one-course',
  standalone: false,
  templateUrl: './read-one.html',
  styleUrl: './read-one.css'
})
export class ReadOne {
  courseId: string = '';
  course: ICourse = {
    id: '',
    courseId: '',
    title: '',
    credits: 0,
    description: ''
  };

  constructor(private courseService: Course, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';

    this.courseService.getCourse(this.courseId).subscribe({
      next: (res: ICourse) => {
        this.course = res;
        console.log(res);
      }, 
      error: (error: any) => {
        console.error(`${error}`);
      }
    });
  }
}

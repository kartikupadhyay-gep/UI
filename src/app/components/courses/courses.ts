import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ICurrentuser } from '../../interfaces/icurrentuser';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  isAdmin: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (currUser: ICurrentuser) => {
        if (currUser.identity === 'admin') {
          this.isAdmin = true;
        }
      }, 
      error: (error: any) => {
        alert(`${error.status} + \n + ${error.statusText} + \n + ${error.message}`);
      }
    })
  }

  findCourse(id: string): void {
    if (id) {
      this.router.navigate(['/singleCourse', id]);
    }
  }

  updateCourse(id: string): void {
    if (id) {
      this.router.navigate(['/updateCourse', id]);
    }
  }

  deleteCourse(id: string): void {
    if (id) {
      this.router.navigate(['/deleteCourse', id]);
    }
  }
}

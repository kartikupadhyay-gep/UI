import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ICurrentuser } from '../../interfaces/icurrentuser';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
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
        console.log(`${error.status} \n ${error.statusText} \n ${error.message}`);
      }
    });
  }

  findStudent(id: string): void {
    if (id) {
      this.router.navigate(['/singleStudent', id]);
    }
  }

  updateStudent(id: string): void {
    if (id) {
      this.router.navigate(['/updateStudent', id]);
    }
  }

  deleteStudent(id: string): void {
    if (id) {
      this.router.navigate(['/deleteStudent', id]);
    }
  }
}

import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { ICurrentuser } from '../../../interfaces/icurrentuser';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  isAdmin: boolean = false;
  userData: ICurrentuser = {
    username: '',
    userId: '',
    identity: ''
  };

  newUser: IUser = {
    username: '',
    password: '',
    userId: '',
    role: ''
  }

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (data: ICurrentuser) => {
        this.userData = data;
        this.isAdmin = this.userData.identity === 'admin';
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    })
  }

  onSubmit(userData: IUser) {
    if (this.isAdmin) {
      this.authService.signup(userData).subscribe({
        next: (res: IUser) => {
          alert(`${res} for ${userData.username} as ${userData.role}`);
          this.router.navigate(['']);
        }, 
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Error creating user: ' + error.error.message);
        }
      })
    }
  }
}

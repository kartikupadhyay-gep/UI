import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userData: IUser = {
    username: '',
    password: ''
  }

  constructor(private authService: Auth, private router: Router) {}

  login(user: IUser) {
    this.userData = user;
    this.authService.login(this.userData).subscribe({
      next: (res) => { 
        this.userData.token = res.token;
        this.authService.saveToken(this.userData.token);
        this.router.navigate(['']);
      }, 
      error: (err) => {
        alert(`Login failed: ${err.message}`);
      }
    });
  }
}

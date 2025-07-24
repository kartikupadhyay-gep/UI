import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { ICurrentuser } from '../../../interfaces/icurrentuser';

@Component({
  selector: 'app-current-user',
  standalone: false,
  templateUrl: './current-user.html',
  styleUrl: './current-user.css'
})
export class CurrentUser {
  userData: ICurrentuser = {
    username: '',
    userId: '',
    identity: ''
  }

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser().subscribe({
      next: (data) => {
        this.userData.username = data.username;
        this.userData.identity = data.identity || 'Viewer';
        this.userData.userId = data.userId || 'N/A';
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }
}

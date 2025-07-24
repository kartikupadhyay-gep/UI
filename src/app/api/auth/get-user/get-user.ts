import { Component } from '@angular/core';
import { IUser } from '../../../interfaces/iuser';
import { Auth } from '../../../services/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICurrentuser } from '../../../interfaces/icurrentuser';

@Component({
  selector: 'app-get-user',
  standalone: false,
  templateUrl: './get-user.html',
  styleUrl: './get-user.css'
})
export class GetUser {
  isUsername: boolean = false;
  isExists: boolean = false;
  username: string = '';

  currUserIdentity: string = '';

  userData: any = {
    id: '',
    username: '',
    userId: '',
    identity: ''
  }

  constructor(private authService: Auth, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (user: any) => {
        this.currUserIdentity = user.identity;
      }
    })
  }

  usernameSubmit(username: string): void {
    this.isUsername = true;
    this.authService.getUser(username).subscribe({
      next: (data: any) => {
        if (data && data.username) {
          this.isExists = true;
          this.userData = data;
        } else {
          this.isExists = false;
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.isExists = false;
      }
    });
  }

  refresh() {
    this.isUsername = false;
    this.username = '';
    this.userData = {
      id: '',
      username: '',
      userId: '',
      identity: ''
    };
  }
}

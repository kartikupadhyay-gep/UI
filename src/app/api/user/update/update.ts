import { Component, OnInit } from '@angular/core';
import { ICurrentuser } from '../../../interfaces/icurrentuser';
import { IUser } from '../../../interfaces/iuser';
import { Auth } from '../../../services/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-update-user',
  standalone: true,
  templateUrl: './update.html',
  styleUrl: './update.css',
  imports: [FormsModule, CommonModule, RouterModule]
})
export class Update implements OnInit {
  isAuthorized: boolean = false;
  userId: string = '';

  updatedUser: IUser = {
    username: '',
    password: '',
    role: ''
  };

  constructor(
    private authService: Auth, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    this.authService.currentUser().pipe(
      switchMap((currentUser: ICurrentuser) => {
        
        this.isAuthorized = (currentUser.identity === 'admin' || currentUser.userId === this.userId);

        
        if (this.isAuthorized) {
          return this.authService.getUser(this.userId);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (userToUpdate: any) => {
        
        if (userToUpdate) {
          this.updatedUser = {
            username: userToUpdate.username,
            password: '', 
            role: userToUpdate.identity
          };
        }
      },
      error: (err) => {
        console.error("Error in update user flow:", err);
        this.isAuthorized = false; 
      }
    });
  }

  onSubmit(updatedUser: IUser): void {
    if (this.isAuthorized) {

      this.authService.updateUser(this.userId, this.updatedUser).subscribe({
        next: (res: any) => {
          alert(`User ${this.updatedUser.username} updated successfully!`);
          this.router.navigate(['/currentUser']);
        }, 
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Error updating user: ' + (error.error.message || error.message));
        }
      });
    }
  }
}

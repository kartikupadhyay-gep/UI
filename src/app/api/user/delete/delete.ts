import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  templateUrl: './delete.html',
  styleUrl: './delete.css',
  imports: [FormsModule, CommonModule, RouterModule]
})

export class Delete {
  isAdmin: boolean = false;
  userId: string = '';

  userData: any = {
    id: '',
    username: '',
    userId: '',
    identity: ''
  };

  constructor(private authService: Auth, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.authService.currentUser().subscribe({
      next: (data: any) => {
        this.isAdmin = data.identity === 'admin';

        if (this.isAdmin) {
          this.authService.getUser(this.userId).subscribe({
            next: (user: any) => {
              this.userData = user;
            }, 
            error: (error: any) => {
              console.error(`Error Deleting user: ${error}`);
            }
          })
        }
      }
    });
  }

  onDelete(): void {
    if (this.isAdmin) {
      this.authService.deleteUser(this.userId).subscribe({
        next: (res: any) => {
          alert(`${res} + User ${this.userData.username} deleted successfully!`);
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.error("Error deleting user:", err);
          alert("Failed to delete user.");
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['get-user']); 
  }
}


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICurrentuser } from '../../interfaces/icurrentuser';
import { Auth } from '../../services/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currUser: ICurrentuser = {
    username: '',
    userId: '',
    identity: ''
  }

  constructor(private authService: Auth, private router: Router, private cookieService: CookieService) {}
  
  ngOnInit() {
    const token = this.cookieService.get('jwt');
    if (token && token !== '') {
      this.isLoggedIn = !this.isLoggedIn;
      this.authService.currentUser().subscribe({
        next: (data: ICurrentuser) => {
          this.currUser = data;
          this.authService.saveIdentity(data.identity);
          this.isAdmin = data.identity === 'admin';
        }
      });
    }
  }

  logout() {
    this.cookieService.deleteAll();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['']);
    alert('You have been logged out successfully.');
  }
}

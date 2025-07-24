import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'UI';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.checkLogin();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLogin();
    });
  }

  private checkLogin(): void {
    const token = this.cookieService.get('jwt');
    this.isLoggedIn = !!token;
  }
}

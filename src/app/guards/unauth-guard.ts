import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { map, of } from 'rxjs';

export const unauthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();

  if (token && token !== '') {
    router.navigate(['currentUser']);
    return of(false);
  }

  return of(true);
};

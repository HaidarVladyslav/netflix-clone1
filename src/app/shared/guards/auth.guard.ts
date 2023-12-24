import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../data-access/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.getUser$.pipe(
    tap((user) => {
      if (!user) router.navigateByUrl('/auth/login');
    }),
    map(user => !!user),
  );
};

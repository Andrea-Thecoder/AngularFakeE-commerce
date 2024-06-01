import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticatorService } from '../services/authenticator.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticatorService);
  const router = inject(Router);

  if (authService.loggedIn) {
    return true;
  } else {
    router.navigate(['/Login']);
    return false;
  }
};
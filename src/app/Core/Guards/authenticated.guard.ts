import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Si esta autenticado, regresalo a la página de videos
  if (authService.isAuthenticated()) {
    return router.navigate(['/microservice-youtube/videos']);
  } else {
    return true;
  }
};

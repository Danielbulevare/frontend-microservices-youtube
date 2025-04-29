import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  /*
  Valida si no estamos autenticados, lo vamos a redireccionar al login
  */

  const authService = inject(AuthService);
  const router = inject(Router);

  //Si tiene token, regresa true para que pueda pasar a nivel de ruta
  if (authService.isAuthenticated()) {
    return true;
  } else {
    //Si no está autenticado, redirecciona
    return router.navigate(['/login']);
  }
};

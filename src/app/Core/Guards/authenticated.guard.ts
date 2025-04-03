import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../Services/Keycloak/keycloak.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (!keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['/microservice-store/store']);
    return false;
  }
  return true;
};

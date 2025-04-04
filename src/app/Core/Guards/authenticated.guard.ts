import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  return true;
};

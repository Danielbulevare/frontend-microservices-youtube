import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './Core/Services/Keycloak/keycloak.service';
import { authTokenInterceptor } from './Core/Interceptors/auth-token.interceptor';

const keycloakService = new KeycloakService();


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor])),
    { provide: KeycloakService, useValue: keycloakService },
  ],
};

// Inicializar Keycloak antes de arrancar la aplicación
export function initKeycloak(): Promise<void> {
  return keycloakService.init();
}
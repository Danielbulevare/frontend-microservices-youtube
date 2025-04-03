import { HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../Services/Keycloak/keycloak.service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  const token = keycloakService.keycloak.token; //Obtiene el token de Keycloak una vez logueado el usuario
  const apiURLYouTube = `${environment.URL_BASE_API_YOUTUBE}`

  if (req.url.includes(apiURLYouTube)) {
    //Si la solicitud es a la api de YouTube, no agregues el token, ya que de lo contrario fallará
    return next(req);
  }

  if (token) {
    //Clona la solicitud y agrega el token a las cabeceras
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(clonedRequest); //Pasar la solicitud clonada
  }

  return next(req);
};

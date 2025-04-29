import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); //Obtiene el token del almacenamiento
  const apiURLYouTube = `${environment.URL_BASE_API_YOUTUBE}`;

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

  return next(req); //Pasa la solicitud original si no hay token
};

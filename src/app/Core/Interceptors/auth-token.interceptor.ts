import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const apiURLYouTube = `${environment.URL_BASE_API_YOUTUBE}`

  if (req.url.includes(apiURLYouTube)) {
    //Si la solicitud es a la api de YouTube, no agregues el token, ya que de lo contrario fallará
    return next(req);
  }

  return next(req);
};

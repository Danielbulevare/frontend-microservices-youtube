import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../../Models/Requests/i-auth';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { IUser } from '../../Models/Entities/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = 'authToken';
  private userInfo: IUser | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public token(auth: IAuth): Observable<string> {
    return this.httpClient
      .post<string>(
        `${environment.URL_BASE_API_IDENTITY}/token`,
        auth,
        { responseType: 'text' as 'json' } //Le especifico a Angular que espero un texto plano
      )
      .pipe(
        tap((response) => {
          this.setToken(response); //Almaceno el token en el local storage
          this.refreshUserProfile(); //Actualizo el perfil del usuario
        })
      );
  }

  public refreshUserProfile() {
    const token = this.getToken();

    if (token) {
      const payload = this.decodeJwtPayload(token);

      this.userInfo = {
        id: payload.id,
        name: payload.name,
        surnames: payload.surnames,
        userName: payload.userName,
        email: payload.email,
        password: '',
        role: payload.role,
      };
    }
  }

  private decodeJwtPayload(token: string): any {
    /*
    Este método se encarga de decodificar el payload del token, para obtener la información del usuario
    El token está en formato JWT, así que lo decodificamos usando atob, pero atob() convierte
    la cadena base64 a un string plano en formato binario, lo que puede corromper los caracteres
    especiales como acentos o letras ñ si el contenido tiene codificación UTF-8.
    Asi que usamos decodeURIComponent con escape para forzar la conversión correcta a UTF-8.

    Esta técnica transforma el resultado de atob() a una cadena UTF-8 válida. Después de este
    cambio, deberías ver correctamente los nombres con acentos y caracteres especiales.
    */
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  }

  public getUserInfo(): IUser | null {
    //Este método retorna el usuario logueado
    return this.userInfo;
  }

  private setToken(token: string): void {
    //Este método almacena el token en el local storage
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    //Recupera el token siempre y cuando sea diferente de undefined, para quitar el error de la consola
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    /*
   Este método valida que el usuario este está autenticado o no, validando el tiempo de
   expiración del token y si el token existe dentro de nuestro local storage
   */
    const token = this.getToken();

    //Si el token no existe, retorna false
    if (!token) {
      return false;
    }

    //Recupera el payload del token (el token está en base64, así que hay que decodificar con atob)
    const payload = JSON.parse(atob(token.split('.')[1])); //El payload está en la posición 1 del jwt
    const exp = payload.exp * 1000; //Recupera la fecha de expiración y la convertimos a milisegundos

    return Date.now() < exp; //Valida si la fecha actual es menor que la fecha de expiración
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}

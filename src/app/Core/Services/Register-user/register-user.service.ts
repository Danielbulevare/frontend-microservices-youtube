import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../Models/Entities/iuser';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  constructor(private httpClient: HttpClient) {}

  public saveUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.URL_BASE_API_IDENTITY}/register`,
      user
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Welcome } from '../../Models/welcome';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiYouTubeService {
  constructor(private httpClient: HttpClient) {}

  public search(q: string): Observable<Welcome> {
    return this.httpClient.get<Welcome>(
      `${environment.URL_BASE_API_YOUTUBE}/search?part=snippet&maxResults=${environment.MAX_RESULTS}&q=${q}&key=${environment.KEY}`
    );
  }

  public searchPage(q: string, pageToken: string | undefined): Observable<Welcome> {
    return this.httpClient.get<Welcome>(
      `${environment.URL_BASE_API_YOUTUBE}/search?part=snippet&maxResults=${environment.MAX_RESULTS}&q=${q}&key=${environment.KEY}&pageToken=${pageToken}`
    );
  }
}

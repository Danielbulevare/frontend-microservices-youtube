import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISaveFavoriteVideo } from '../../Models/Responses/isave-favorite-video';
import { Observable } from 'rxjs';
import { IFavoriteVideo } from '../../Models/Entities/ifavorite-video';
import { environment } from '../../../../environments/environment';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class FavoriteVideoService {
  constructor(private httpClient: HttpClient) {}

  public saveVideo(video: ISaveFavoriteVideo): Observable<IFavoriteVideo> {
    return this.httpClient.post<IFavoriteVideo>(
      `${environment.URL_BASE_API_FAVORITE_VIDEOS}`,
      video
    );
  }

  public findUserVideos(
    userId: UUID | undefined,
    page: number,
    records: number
  ): Observable<IFavoriteVideo[]> {
    return this.httpClient.get<IFavoriteVideo[]>(
      `${environment.URL_BASE_API_FAVORITE_VIDEOS}/${userId}/${page}/${records}`
    );
  }

  public totalUserVideos(userId: UUID | undefined): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.URL_BASE_API_FAVORITE_VIDEOS}/${userId}`
    );
  }

  public deleteFavoriteVideo(id: UUID): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.URL_BASE_API_FAVORITE_VIDEOS}/${id}`
    );
  }
}

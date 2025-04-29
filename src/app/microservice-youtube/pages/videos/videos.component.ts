import { Component, inject, signal } from '@angular/core';
import { ApiYouTubeService } from '../../../Core/Services/YouTube/api-you-tube.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Welcome } from '../../../Core/Models/welcome';
import { FavoriteVideoService } from '../../../Core/Services/FavoriteVideo/favorite-video.service';
import { ISaveFavoriteVideo } from '../../../Core/Models/Responses/isave-favorite-video';
import { Item } from '../../../Core/Models/item';
import { IFavoriteVideo } from '../../../Core/Models/Entities/ifavorite-video';
import { NotificationService } from '../../../Core/Services/Notification/notification.service';
import { AuthService } from '../../../Core/Services/Auth/auth.service';

@Component({
  selector: 'app-videos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export default class VideosComponent {
  private authService = inject(AuthService);
  private ApiYouTubeService = inject(ApiYouTubeService);
  private apiFavoriteVideoService = inject(FavoriteVideoService);
  private notificationService = inject(NotificationService);

  videosList = signal<Welcome | null>(null);

  public formSearch = new FormGroup({
    txtSearch: new FormControl(''),
  });

  public search(): void {
    this.ApiYouTubeService.search(this.txtSearch.value).subscribe({
      next: (response: Welcome) => {
        this.videosList.set(response);
      },
      error: (response: any) => {
        this.showNotification(
          'Error al obtener videos de YouTube.',
          'alert alert-danger'
        );
      },
    });
  }

  showNotification(message: string, alertType: string) {
    this.notificationService.showNotification(message, alertType);
  }

  public searchPage(): void {
    this.ApiYouTubeService.searchPage(
      this.txtSearch.value,
      this.videosList()?.nextPageToken
    ).subscribe({
      next: (response: Welcome) => {
        this.videosList.set(response);
      },
      error: (response: any) => {
        this.showNotification(
          'Error al cargar videos de la siguiente página.',
          'alert alert-danger'
        );
      },
    });
  }

  public addFavoriteVideo(video: Item) {
    let videoToSave: ISaveFavoriteVideo = {
      userId: this.authService.getUserInfo()?.id,
      videoId: video.id.videoId,
      title: video.snippet.title,
      url: video.snippet.thumbnails.medium.url,
    };

    this.apiFavoriteVideoService.saveVideo(videoToSave).subscribe({
      next: (response: IFavoriteVideo) => {
        this.showNotification(
          'El video se agreo a mis videos favoritos.',
          'alert alert-success'
        );
      },
      error: (response: any) => {
        this.showNotification(
          'El video ya lo tienes guardado en mis favoritos.',
          'alert alert-danger'
        );
      },
    });
  }

  get txtSearch() {
    return this.formSearch.get('txtSearch') as FormControl;
  }

  cleanInput() {
    this.txtSearch.setValue('');
  }
}

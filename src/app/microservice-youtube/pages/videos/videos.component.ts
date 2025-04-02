import { Component, inject, signal } from '@angular/core';
import { ApiYouTubeService } from '../../../Core/Services/api-you-tube.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Welcome } from '../../../Core/Models/welcome';

@Component({
  selector: 'app-videos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export default class VideosComponent {
  private ApiYouTubeService = inject(ApiYouTubeService);
  videosList = signal<Welcome | null>(null);

  public formSearch = new FormGroup({
    txtSearch: new FormControl(''),
  });

  public search(): void {
    this.ApiYouTubeService.search(this.txtSearch.value).subscribe({
      next: (response: Welcome) => {
        this.videosList.set(response);
      },
      error: (response: any) => {},
    });
  }

  public searchPage(): void {
    this.ApiYouTubeService.searchPage(this.txtSearch.value, this.videosList()?.nextPageToken).subscribe({
      next: (response: Welcome) => {
        this.videosList.set(response);
      },
      error: (response: any) => {},
    });
  }

  get txtSearch() {
    return this.formSearch.get('txtSearch') as FormControl;
  }

  cleanInput(){
    this.txtSearch.setValue('')
  }
}

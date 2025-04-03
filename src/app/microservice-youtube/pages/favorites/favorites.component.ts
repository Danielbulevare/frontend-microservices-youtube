import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FavoriteVideoService } from '../../../Core/Services/FavoriteVideo/favorite-video.service';
import { IFavoriteVideo } from '../../../Core/Models/Entities/ifavorite-video';
import { KeycloakService } from '../../../Core/Services/Keycloak/keycloak.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UUID } from 'crypto';

@Component({
  selector: 'app-favorites',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export default class FavoritesComponent implements OnInit {
  private favoriteVideoService = inject(FavoriteVideoService);
  private keycloakService = inject(KeycloakService);
  private readonly RECORDS: number = 8;

  myVideos: IFavoriteVideo[] = [];

  disabledNextButton = signal(true);
  disabledPreviousButton = signal(true);
  currentPage = signal(0);
  totalVideos = signal(0);

  pageNumbers = computed(() => Math.ceil(this.totalVideos() / this.RECORDS));

  public formSearch = new FormGroup({
    txtSearch: new FormControl(''),
  });

  ngOnInit(): void {
    this.getTotalVideos();

    //Recupera de la url el número de la paginación
    this.route.params.subscribe((params) =>
      this.currentPage.set(params['page'])
    );

    this.findUserVideos();
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  private getTotalVideos() {
    this.favoriteVideoService
      .totalUserVideos(this.keycloakService.profile?.id)
      .subscribe({
        next: (response: number) => {
          this.totalVideos.set(response);
        },
        error: (response: any) => {},
      });
  }

  get txtSearch() {
    return this.formSearch.get('txtSearch') as FormControl;
  }

  findUserVideos() {
    this.favoriteVideoService
      .findUserVideos(this.keycloakService.profile?.id, this.currentPage(), this.RECORDS)
      .subscribe({
        next: (response: IFavoriteVideo[]) => {
          this.myVideos = response;
          this.disabledNextBtn();
          this.disabledPreviousBtn();
        },
        error: () => {},
      });
  }

  cleanInput() {
    this.txtSearch.setValue('');
  }

  filterVideos(): IFavoriteVideo[] {
    const searchVideo = this.txtSearch.value.toLowerCase();
    return this.myVideos.filter((video) =>
      video.title.toLowerCase().includes(searchVideo)
    );
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.findUserVideos();
  }

  nextPage() {
    this.currentPage.update((page) => Number(page) + 1);
    this.findUserVideos();
  }

  previousPage() {
    this.currentPage.update((page) => Number(page) - 1);
    this.findUserVideos();
  }

  getNextPage(): string {
    return (Number(this.currentPage()) + 1).toString();
  }

  getPreviousPage(): string {
    return (Number(this.currentPage()) - 1).toString();
  }

  private disabledNextBtn() {
    if (
      this.currentPage() >= Number(this.pageNumbers()) - 1 ||
      this.currentPage() > this.pageNumbers()
    )
      this.disabledNextButton.set(true);
    else this.disabledNextButton.set(false);
  }

  private disabledPreviousBtn() {
    if (this.currentPage() > 0) this.disabledPreviousButton.set(false);
    else this.disabledPreviousButton.set(true);
  }

  deleteVideo(id: UUID) {
    this.favoriteVideoService
      .deleteFavoriteVideo(id
      )
      .subscribe({
        next: (response: void) => {
          this.findUserVideos();
          this.getTotalVideos();
        },
        error: () => {},
      });
  }
}

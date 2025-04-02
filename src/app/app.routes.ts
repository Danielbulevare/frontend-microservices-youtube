import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'microservice-youtube',
    loadComponent: () =>
      import('./microservice-youtube/microservice-youtube.component'),
    children: [
      {
        path: 'videos',
        loadComponent: () =>
          import('./microservice-youtube/pages/videos/videos.component'),
      },
      {
        path: 'favorites/:page',
        loadComponent: () =>
          import('./microservice-youtube/pages/favorites/favorites.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/microservice-youtube/videos',
    pathMatch: 'full',
  },
];

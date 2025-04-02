import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'microservice-youtube',
    loadComponent: () =>
      import('./microservice-youtube/microservice-youtube.component'),
  },
  {
    path: '',
    redirectTo: '/microservice-youtube',
    pathMatch: 'full',
  },
];

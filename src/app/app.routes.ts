import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Auth/Pages/Login/login/login.component'),
  },
  {
    path: 'register-account',
    loadComponent: () => import('./Auth/Pages/Register/register/register.component'),
  },
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
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './Shared/Components/PageNotFound/page-not-found/page-not-found.component'
      ),
  },
];

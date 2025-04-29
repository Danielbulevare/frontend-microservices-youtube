import { Routes } from '@angular/router';
import { authenticatedGuard } from './Core/Guards/authenticated.guard';
import { authGuard } from './Core/Guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Auth/Pages/Login/login/login.component'),
    canActivate: [authenticatedGuard],
  },
  {
    path: 'register-account',
    loadComponent: () =>
      import('./Auth/Pages/Register/register/register.component'),
    canActivate: [authenticatedGuard],
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
        //Protege la ruta de la aplicación si no está autenticado
        canActivate: [authGuard],
      },
      {
        path: 'favorites/:page',
        loadComponent: () =>
          import('./microservice-youtube/pages/favorites/favorites.component'),
        canActivate: [authGuard],
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

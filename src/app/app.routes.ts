import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component') },
  { path: 'auth/login', loadComponent: () => import('./auth/login/login.component') },
  { path: 'auth/register', loadComponent: () => import('./auth/register/register.component') },
  { path: 'player', loadComponent: () => import('./player/player.component') },
  { path: 'movie', loadComponent: () => import('./movie/movie.component') },
  { path: 'tv', loadComponent: () => import('./tv-show/tv-show.component') },
];

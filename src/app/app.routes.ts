import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component'), canActivate: [] }, // authGuard
  { path: 'auth/login', loadComponent: () => import('./auth/login/login.component') },
  { path: 'auth/register', loadComponent: () => import('./auth/register/register.component') },
  { path: 'account', loadComponent: () => import('./account/account.component'), canActivate: [] } // authGuard
];

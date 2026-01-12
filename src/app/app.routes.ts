import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./features/auth/login.routes').then(m => m.routes)
  },
  {
    path: 'workspace',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/workspace.routes').then(m => m.routes)
  },
   {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.routes)
  }
];

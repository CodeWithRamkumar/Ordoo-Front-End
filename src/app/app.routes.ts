import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./features/auth/login.routes').then(m => m.routes)
  },
  {
    path: 'workspace',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/workspace.routes').then(m => m.routes)
  }
];

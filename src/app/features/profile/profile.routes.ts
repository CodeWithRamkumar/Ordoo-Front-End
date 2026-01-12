import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./profile-view/profile-view.page').then(m => m.ProfileViewPage)
    },
];

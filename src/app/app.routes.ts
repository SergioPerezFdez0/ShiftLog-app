import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
    { path: 'registry', loadComponent: () => import('./features/punch/punch.component').then(m => m.PunchComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
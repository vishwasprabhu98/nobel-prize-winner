import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'prize-list',
    loadComponent: () => import('./features/nobel-winners-list/nobel-winners-list.component').then(c => c.NobelWinnersListComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'laureate/:id',
    loadComponent: () => import('./features/laureate/laureate.component').then(c => c.LaureateComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

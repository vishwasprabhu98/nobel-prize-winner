import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/nobel-winners-list/nobel-winners-list.component').then(c => c.NobelWinnersListComponent)
  }
];

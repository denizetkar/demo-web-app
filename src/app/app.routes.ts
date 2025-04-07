import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/filter/filter.component').then(
        (m) => m.FilterComponent
      ),
  },
];

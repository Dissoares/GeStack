import { Routes } from '@angular/router';

export const ROTAS_LIDERANCA: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./lideranca-dashboard/lideranca-dashboard.component').then(
        (c) => c.LiderancaDashboardComponent
      ),
  },
  {
    path: 'squad',
    loadChildren: () =>
      import('./squads/squads.routing').then((m) => m.ROTAS_SQUAD),
  },
  {
    path: 'equipe',
    loadChildren: () =>
      import('./equipe/equipe.routing').then((m) => m.ROTAS_EQUIPE),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./../perfil/perfil.component').then((c) => c.PerfilComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

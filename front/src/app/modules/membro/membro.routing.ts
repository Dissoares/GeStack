import { Routes } from '@angular/router';

export const ROTAS_MEMBRO: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./membro-dashboard/membro-dashboard.component').then(
        (c) => c.MembroDashboardComponent
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('../perfil/perfil.component').then((m) => m.PerfilComponent),
  },
];

import { Routes } from '@angular/router';

export const ROTAS_MEMBRO: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./membro-dashboard/membro-dashboard.component').then(
        (m) => m.MembroDashboardComponent
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('../perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

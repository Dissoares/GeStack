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
      import(
        '../../gerenciamento/gerenciar-perfil/gerenciar-perfil.component'
      ).then((m) => m.GerenciarPerfilComponent),
  },
];

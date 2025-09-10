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
        '../../gerenciamento/perfil-usuario/perfil-usuario.component'
      ).then((m) => m.PerfilUsuarioComponent),
  },
];

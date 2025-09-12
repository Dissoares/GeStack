import { GerenciarUsuariosResolver } from '../../../resolvers';
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
    path: 'perfil',
    loadComponent: () =>
      import(
        '../../gerenciamento/gerenciar-perfil/gerenciar-perfil.component'
      ).then((c) => c.GerenciarPerfilComponent),
  },
  {
    path: 'gerenciar-usuarios',
    resolve: {
      usuarios: GerenciarUsuariosResolver,
    },
    loadComponent: () =>
      import(
        '../../gerenciamento/gerenciar-usuarios/gerenciar-usuarios.component'
      ).then((c) => c.GerenciarUsuariosComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

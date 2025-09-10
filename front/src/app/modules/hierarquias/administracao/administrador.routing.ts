import { GerenciarUsuariosResolver } from '../../../resolvers';
import { Routes } from '@angular/router';

export const ROTAS_ADMINISTRADOR: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../administracao/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import(
        './../../gerenciamento/perfil-usuario/perfil-usuario.component'
      ).then((c) => c.PerfilUsuarioComponent),
  },
  {
    path: 'gerenciar-usuarios',
    resolve: {
      usuarios: GerenciarUsuariosResolver,
    },
    loadComponent: () =>
      import(
        './../../gerenciamento/gerenciar-usuarios/gerenciar-usuarios.component'
      ).then((c) => c.GerenciarUsuariosComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

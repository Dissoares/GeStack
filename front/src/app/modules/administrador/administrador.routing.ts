import { Routes } from '@angular/router';

export const ROTAS_ADMINISTRADOR: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './administrador-dashboard/administrador-dashboard.component'
      ).then((c) => c.AdministradorDashboardComponent),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./../perfil/perfil.component').then((c) => c.PerfilComponent),
  },
  {
    path: 'gerenciar-usuarios',
    loadComponent: () =>
      import('./gerenciar-usuarios/gerenciar-usuarios.component').then(
        (c) => c.GerenciarUsuariosComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

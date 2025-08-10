import { AuthGuard } from '../../guards/auth.guard';
import { NivelAcessoEnum } from '../../core/enums';
import { Routes } from '@angular/router';

export const ROTAS_ADMINISTRADOR: Routes = [
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
    loadComponent: () =>
      import(
        './administrador-dashboard/administrador-dashboard.component'
      ).then((c) => c.AdministradorDashboardComponent),
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
    loadComponent: () =>
      import(
        './administrador-perfil/administrador-perfil.component'
      ).then((c) => c.AdministradorPerfilComponent),
  },
  {
    path: 'equipes',
    canActivate: [AuthGuard],
    data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
    loadComponent: () =>
      import(
        './administrador-perfil/administrador-perfil.component'
      ).then((c) => c.AdministradorPerfilComponent),
  },
];

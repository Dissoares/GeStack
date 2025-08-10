import { AuthGuard } from './guards/auth.guard';
import { NivelAcessoEnum } from './core/enums';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then(
        (c) => c.ConteudoComponent
      ),
    children: [
      {
        path: 'administrador',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/administrador/administrador.routing').then(
            (m) => m.ROTAS_ADMINISTRADOR
          ),

        data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
      },
      {
        path: 'lideranca',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/lideranca/lideranca.routing').then(
            (m) => m.ROTAS_LIDERANCA
          ),
        data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
      },
      {
        path: 'membro',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/membro/membro.routing').then((m) => m.ROTAS_MEMBRO),
        data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];

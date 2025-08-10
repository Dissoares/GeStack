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
        path: 'dashboard/administrador-listagem',
        canActivate: [AuthGuard],
        data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
        loadComponent: () =>
          import(
            './modules/administrador/administrador-listagem/administrador-listagem.component'
          ).then((c) => c.AdministradorListagemComponent),
      },
      {
        path: 'dashboard/administrador-formulario',
        canActivate: [AuthGuard],
        data: { permissoes: [NivelAcessoEnum.ADMIN.id] },
        loadComponent: () =>
          import(
            './modules/administrador/administrador-dashboard/administrador-dashboard.component'
          ).then((c) => c.AdministradorDashboardComponent),
      },
      {
        path: 'dashboard/lideranca-listagem',
        canActivate: [AuthGuard],
        data: {
          permissoes: [
            NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id,
            NivelAcessoEnum.LIDER_NEGOCIO.id,
          ],
        },
        loadComponent: () =>
          import(
            './modules/lideranca/lideranca-listagem/lideranca-listagem.component'
          ).then((c) => c.LiderancaListagemComponent),
      },
      {
        path: 'dashboard/lideranca-formulario',
        canActivate: [AuthGuard],
        data: {
          permissoes: [
            NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id,
            NivelAcessoEnum.LIDER_NEGOCIO.id,
          ],
        },
        loadComponent: () =>
          import(
            './modules/lideranca/lideranca-formulario/lideranca-formulario.component'
          ).then((c) => c.LiderancaFormularioComponent),
      },
      {
        path: 'dashboard/membro-listagem',
        canActivate: [AuthGuard],
        data: {
          permissoes: [
            NivelAcessoEnum.DESENVOLVEDOR.id,
            NivelAcessoEnum.ANALISTA.id,
          ],
        },
        loadComponent: () =>
          import(
            './modules/membros-squad/membro-squad-listagem/membro-squad-listagem.component'
          ).then((c) => c.MembroSquadListagemComponent),
      },
      {
        path: 'dashboard/membro-formulario',
        canActivate: [AuthGuard],
        data: {
          permissoes: [
            NivelAcessoEnum.DESENVOLVEDOR.id,
            NivelAcessoEnum.ANALISTA.id,
          ],
        },
        loadComponent: () =>
          import(
            './modules/membros-squad/membro-squad-formulario/membro-squad-formulario.component'
          ).then((c) => c.MembroSquadFormularioComponent),
      },

      {
        path: '**',
        redirectTo: '/auth',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];

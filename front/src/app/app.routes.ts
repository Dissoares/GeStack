import { AuthGuard } from './guards/auth.guard';
import { PerfilEnum } from './core/enums';
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
          import(
            './modules/hierarquias/administracao/administrador.routing'
          ).then((m) => m.ROTAS_ADMINISTRADOR),
        data: { permissoes: [PerfilEnum.ADMINISTRADOR.id] },
      },
      {
        path: 'lideranca',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/hierarquias/lideranca/lideranca.routing').then(
            (m) => m.ROTAS_LIDERANCA
          ),
        data: {
          permissoes: [
            PerfilEnum.LIDER_DESENVOLVIMENTO.id,
            PerfilEnum.LIDER_NEGOCIO.id,
            PerfilEnum.ADMINISTRADOR.id,
          ],
        },
      },
      {
        path: 'membro',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/hierarquias/membro/membro.routing').then(
            (m) => m.ROTAS_MEMBRO
          ),
        data: {
          permissoes: [
            PerfilEnum.DESENVOLVEDOR.id,
            PerfilEnum.ANALISTA_NEGOCIO.id,
            PerfilEnum.ADMINISTRADOR.id,
          ],
        },
      },
      {
        path: 'atividade',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/gerenciamento/atividade/atividade.routing').then(
            (m) => m.ROTAS_ATIVIDADE
          ),
        data: {
          permissoes: [
            PerfilEnum.DESENVOLVEDOR.id,
            PerfilEnum.ANALISTA_NEGOCIO.id,
            PerfilEnum.ADMINISTRADOR.id,
          ],
        },
      },
      {
        path: 'sistema/gerenciar',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/gerenciamento/sistemas-gerenciar/sistemas-gerenciar.component'
          ).then((m) => m.SistemasGerenciarComponent),

        data: {
          permissoes: [
            PerfilEnum.DESENVOLVEDOR.id,
            PerfilEnum.ANALISTA_NEGOCIO.id,
            PerfilEnum.ADMINISTRADOR.id,
          ],
        },
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

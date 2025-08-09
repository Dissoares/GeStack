import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
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
        canActivate: [AuthGuard],
        path: 'administrador',
        children: [
          {
            path: 'listagem',
            loadComponent: () =>
              import(
                './modules/administrador/administrador-listagem/administrador-listagem.component'
              ).then((c) => c.AdministradorListagemComponent),
          },
          {
            path: 'formulario',
            loadComponent: () =>
              import(
                './modules/administrador/administrador-formulario/administrador-formulario.component'
              ).then((c) => c.AdministradorFormularioComponent),
          },
        ],
      },

      {
        path: 'lider',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listagem',
            loadComponent: () =>
              import(
                './modules/lideranca/lideranca-listagem/lideranca-listagem.component'
              ).then((c) => c.LiderancaListagemComponent),
          },
          {
            path: 'formulario',
            loadComponent: () =>
              import(
                './modules/lideranca/lideranca-formulario/lideranca-formulario.component'
              ).then((c) => c.LiderancaFormularioComponent),
          },
        ],
      },

      {
        path: 'squad',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'listagem',
            loadComponent: () =>
              import(
                './modules/membros-squad/membro-squad-listagem/membro-squad-listagem.component'
              ).then((c) => c.MembroSquadListagemComponent),
          },
          {
            path: 'formulario',
            loadComponent: () =>
              import(
                './modules/membros-squad/membro-squad-formulario/membro-squad-formulario.component'
              ).then((c) => c.MembroSquadFormularioComponent),
          },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

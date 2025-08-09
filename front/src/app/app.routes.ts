import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
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
        path: 'dashboard',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'administrador-listagem',
            loadComponent: () =>
              import(
                './modules/administrador/administrador-listagem/administrador-listagem.component'
              ).then((c) => c.AdministradorListagemComponent),
          },
          {
            path: 'administrador-formulario',
            loadComponent: () =>
              import(
                './modules/administrador/administrador-formulario/administrador-formulario.component'
              ).then((c) => c.AdministradorFormularioComponent),
          },
          {
            path: 'lideranca-listagem',
            loadComponent: () =>
              import(
                './modules/lideranca/lideranca-listagem/lideranca-listagem.component'
              ).then((c) => c.LiderancaListagemComponent),
          },
          {
            path: 'lideranca-formulario',
            loadComponent: () =>
              import(
                './modules/lideranca/lideranca-formulario/lideranca-formulario.component'
              ).then((c) => c.LiderancaFormularioComponent),
          },
          {
            path: 'membro-listagem',
            loadComponent: () =>
              import(
                './modules/membros-squad/membro-squad-listagem/membro-squad-listagem.component'
              ).then((c) => c.MembroSquadListagemComponent),
          },
          {
            path: 'membro-formulario',
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
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

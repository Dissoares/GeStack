import { Routes } from '@angular/router';

export const ROTAS_EQUIPE: Routes = [
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./cadastrar/cadastrar.component').then(
        (c) => c.CadastrarComponent
      ),
  },
  {
    path: 'gerenciar',
    loadComponent: () =>
      import('./gerenciar/gerenciar.component').then(
        (c) => c.GerenciarComponent
      ),
  },
];

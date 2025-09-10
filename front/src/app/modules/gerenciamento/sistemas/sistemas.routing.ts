import { Routes } from '@angular/router';

export const ROTAS_SISTEMA: Routes = [
  {
    path: 'gerenciar',
    loadComponent: () =>
      import('./sistemas-gerenciar/sistemas-gerenciar.component').then(
        (c) => c.SistemasGerenciarComponent
      ),
  },
  
];

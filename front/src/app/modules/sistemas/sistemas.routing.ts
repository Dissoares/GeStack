import { Routes } from '@angular/router';

export const ROTAS_SISTEMA: Routes = [
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./sistemas-formulario/sistemas-formulario.component').then(
        (c) => c.SistemasFormularioComponent
      ),
  },
  {
    path: 'visualizar',
    loadComponent: () =>
      import('./sistemas-listagem/sistemas-listagem.component').then(
        (c) => c.SistemasListagemComponent
      ),
  },
];

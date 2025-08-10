import { Routes } from '@angular/router';

export const ROTAS_MEMBRO: Routes = [
  {
    path: 'escala',
    loadChildren: () =>
      import('./escala/escala.component').then((m) => m.EscalaComponent),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./../perfil/perfil.component').then((m) => m.PerfilComponent),
  },
];

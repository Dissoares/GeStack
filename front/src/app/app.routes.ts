import { RotasEnum } from './core/enums/rotas.enum';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: RotasEnum.AUTH.CADASTRO,
    loadComponent: () =>
      import('./auth/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: RotasEnum.ROOT,
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then(
        (m) => m.ConteudoComponent
      ),
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

import { RotasEnum } from './core/enums/rotas.enum';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: RotasEnum.ROOT,
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then(
        (m) => m.ConteudoComponent
      ),
  },

  {
    path: '**',
    redirectTo: RotasEnum.ESTABELECIMENTO.CATALOGO,
    pathMatch: 'full',
  },
];

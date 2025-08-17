import { Routes } from '@angular/router';

export const ROTAS_SKILL: Routes = [
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./skill-formulario.component').then(
        (c) => c.SkillFormularioComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

export const ROTAS_ATIVIDADE = [
  {
    path: 'criar',
    loadComponent: () =>
      import('./demandas-formulario/demandas-formulario.component').then(
        (c) => c.DemandasFormularioComponent
      ),
  },
  {
    path: 'visualizar',
    loadComponent: () =>
      import('./demandas-listagem/demandas-listagem.component').then(
        (c) => c.DemandasListagemComponent
      ),
  },
];

export const ROTAS_ATIVIDADE = [
  {
    path: 'criar',
    loadComponent: () =>
      import('./atividade-formulario/atividade-formulario.component').then(
        (c) => c.AtividadeFormularioComponent
      ),
  },
  {
    path: 'visualizar',
    loadComponent: () =>
      import('./atividade-listagem/atividade-listagem.component').then(
        (c) => c.AtividadeListagemComponent
      ),
  },
];

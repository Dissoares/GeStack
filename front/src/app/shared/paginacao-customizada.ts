import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class PaginacaoCustomizada extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Próxima';
  override previousPageLabel = 'Anterior';
  override firstPageLabel = 'Primeira';
  override lastPageLabel = 'Última';

  override getRangeLabel = (
    pagina: number,
    tamanhoPagina: number,
    quantidadeItensDaPagina: number
  ): string => {
    if (quantidadeItensDaPagina === 0 || tamanhoPagina === 0) {
      return `0 de ${quantidadeItensDaPagina}`;
    }
    const inicio = pagina * tamanhoPagina;
    const itensDaPagina =
      inicio < quantidadeItensDaPagina
        ? Math.min(inicio + tamanhoPagina, quantidadeItensDaPagina)
        : inicio + tamanhoPagina;
    return `${itensDaPagina} de ${quantidadeItensDaPagina} itens`;
  };
}

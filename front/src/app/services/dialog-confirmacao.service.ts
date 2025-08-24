import { DialogConfirmacaoComponent } from '../dialogs/dialog-confirmacao/dialog-confirmacao.component';
import { DadosConfirmacao } from '../core/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogConfirmacaoService {
  constructor(private dadosDialog: MatDialog) {}

  public openDialog(data: DadosConfirmacao): Observable<boolean> {
    return this.dadosDialog
      .open(DialogConfirmacaoComponent, {
        width: '400px',
        data,
      })
      .afterClosed();
  }
}

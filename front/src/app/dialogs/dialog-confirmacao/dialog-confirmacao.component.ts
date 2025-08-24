import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DadosConfirmacao } from '../../core/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    DialogModule,
    MatDialogModule,
  ],
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss'],
})
export class DialogConfirmacaoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: DadosConfirmacao
  ) {}

  public ngOnInit(): void {}

  public aoConfirmar(): void {
    this.dialogRef.close(true);
  }

  public aoCancelar(): void {
    this.dialogRef.close(false);
  }
}

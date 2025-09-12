import { CamposFormularioComponent } from '../../../../components/index.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../../services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-demandas-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './demandas-formulario.component.html',
  styleUrls: ['./demandas-formulario.component.scss'],
})
export class DemandasFormularioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly toastrService: ToastrService
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idAtividade: [null],
      titulo: [null],
      descricao: [null],
      lider: [null],
      squad: [null],
      devResponsavel: [null],
      analistaResponsavel: [null],
      sprint: [null],
      sistema: [null],
      solicitante: [null],
      demanda: [null],
      prioridade: [null],
      pontosEstimados: [null],
      pontosReais: [null],
      tempoEstimado: [null],
      statusAndamento: [null],
      registrosAtividades: this.fb.array([]),
      comentarios: this.fb.array([]),
      anexos: this.fb.array([]),
      dataCriacao: [null],
      dataConclusao: [null],
    });
  }
}

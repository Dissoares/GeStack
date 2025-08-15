import { CamposFormularioComponent } from '../../../components/index.component';
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
import { UsuarioService } from '../../../services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atividade-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './atividade-formulario.component.html',
  styleUrls: ['./atividade-formulario.component.scss'],
})
export class AtividadeFormularioComponent
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
      tituloAtividade: [null],
      descricaoAtividade: [null],
      liderAtividade: [null],
      squadAtividade: [null],
      devResponsavel: [null],
      analistaResponsavel: [null],
      sprintAtividade: [null],
      sistemaAtividade: [null],
      solicitanteAtividade: [null],
      demandaAtividade: [null],
      prioridadeAtividade: [null],
      pontosEstimadosAtividade: [null],
      pontosReaisAtividade: [null],
      tempoEstimadoAtividade: [null],
      statusAndamentoAtividade: [null],
      historicoAlteracoesAtividade: this.fb.array([]),
      comentariosAtividade: this.fb.array([]),
      anexosAtividade: this.fb.array([]),
      dataCriacaoAtividade: [null],
      dataConclusaoAtividade: [null],
    });
  }
}

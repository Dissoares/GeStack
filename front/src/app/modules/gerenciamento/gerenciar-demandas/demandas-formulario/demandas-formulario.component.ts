import { CamposFormularioComponent } from '../../../../components/index.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SistemaService, UsuarioService } from '../../../../services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Sistema, Usuario } from '../../../../core/models';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { PrioridadeEnum } from '../../../../core/enums';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demandas-formulario',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatTimepickerModule,
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
  public listaResponsaveis: Array<Usuario> = [];
  public listaSistemas: Array<Sistema> = [];

  public prioridadeEnum = PrioridadeEnum.getAll();

  private readonly sistemaService = inject(SistemaService);

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly toastrService: ToastrService
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.listarSistemas();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
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
      demandaAtividades: this.fb.array([]),
      comentarios: this.fb.array([]),
      anexos: this.fb.array([]),
      dataCriacao: [null],
      dataConclusao: [null],
      analista: [null],
      desenvolvedor: [null],
    });
  }

  public displayUsuario(usuario: Usuario): string {
    return usuario ? usuario.nome : '';
  }

  public pesquisarResponsavel(nome: string): void {
    if (nome && nome.length >= 3) {
      this.usuarioService.buscarPor(nome).subscribe({
        next: (resultado) => {
          this.listaResponsaveis = resultado;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
    }
  }

  public listarSistemas(): void {
    this.sistemaService.listarSistemas().subscribe({
      next: (sistemas) => {
        this.listaSistemas = sistemas;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}

import {
  CamposFormularioComponent,
  NadaEncontradoComponent,
} from '../../../components/index.component';
import { DialogSistemaComponent } from '../../../dialogs/dialog-sistema/dialog-sistema.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogConfirmacaoService, SistemaService } from '../../../services';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PerfilEnum, SkillCategoriaEnum } from '../../../core/enums';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Sistema } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerenciar-sistemas',
  standalone: true,
  imports: [
    NadaEncontradoComponent,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './gerenciar-sistemas.component.html',
  styleUrls: ['./gerenciar-sistemas.component.scss'],
})
export class GerenciarSistemasComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public dadosTabela = new MatTableDataSource<Sistema>([]);
  public colunasTabela: Array<string> = [
    'id',
    'nome',
    'area',
    'stack',
    'ativo',
    'acoes',
  ];
  private readonly dialogService = inject(DialogConfirmacaoService);
  private readonly sistemaService = inject(SistemaService);
  private readonly toastr = inject(ToastrService);
  private readonly dialog = inject(MatDialog);

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
    this.listarSistemas();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      responsavel: [null],
      linkPrototipo: [null],
      linkDocumentacao: [null],
      linkGit: [null],
      linkProducao: [null],
      skills: [null, Validators.required],
    });
  }

  public cadastrarSistema(): void {
    const dialogRef = this.dialog.open(DialogSistemaComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  public listarSistemas(): void {
    this.sistemaService.listarSistemas().subscribe({
      next: (sistemas) => {
        sistemas ? (this.dadosTabela.data = sistemas) : null;
        setTimeout(() => {
          this.dadosTabela.paginator = this.paginator;
        }, this.dadosTabela.data.length);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public getDescricaoPerfil(id: number): string {
    return PerfilEnum.getById(id)?.descricao || '';
  }

  public getDescricaoCategoriaSkill(id: number): string {
    return SkillCategoriaEnum.getById(id)?.descricao || '';
  }

  public ativaDesativar(sistema: Sistema) {
    sistema.ativo = !sistema.ativo;

    this.sistemaService.ativaDesativar(sistema).subscribe({
      next: (resultado) => {
        if (resultado.ativo) {
          this.toastr.success('Ativado com sucesso!..', 'Sucesso!');
        } else if (!resultado.ativo) {
          this.toastr.info('Sistema desativado.', 'Informação!');
        }
        const index = this.dadosTabela.data.findIndex(
          (s) => s.id === resultado.id
        );
        if (index !== -1) {
          this.dadosTabela.data[index] = resultado;
        }
      },
      error: (erro) => {
        this.toastr.error(
          'Não foi possível alterar o status do sistema',
          erro?.message
        );
      },
    });
  }

  public excluir(idSistema: number) {
    this.dialogService
      .openDialog({
        titulo: 'Confirmação!',
        acao: 'excluir',
        textoConfirmacao: 'Excluir',
        textoCancelamento: 'Cancelar',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this.sistemaService.excluir(idSistema).subscribe((resultado) => {
            resultado
              ? this.toastr.success('Sistema excluído', 'Sucesso!')
              : null;
            this.listarSistemas();
          });
        }
      });
  }

  public editar(sistema: Sistema): void {
    const ehVisualizar: boolean = false;
    const dialogRef = this.dialog.open(DialogSistemaComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
      data: { sistema, ehVisualizar },
    });

    dialogRef.afterClosed().subscribe((fechou) => {
      if (fechou) {
        this.listarSistemas();
      }
    });
  }

  public visualizar(sistema: Sistema): void {
    const ehVisualizar: boolean = true;
    const dialogRef = this.dialog.open(DialogSistemaComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
      data: { sistema, ehVisualizar },
    });

    dialogRef.afterClosed().subscribe((fechou) => {
      if (fechou) {
        this.listarSistemas();
      }
    });
  }
}

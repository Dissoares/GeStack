import { SistemaService } from '../../../services';
import { DialogSistemaComponent } from '../../../dialogs/dialog-sistema/dialog-sistema.component';
import { CamposFormularioComponent } from '../../../components/index.component';
import { PerfilEnum, SkillCategoriaEnum } from '../../../core/enums';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Sistema, Skill } from '../../../core/models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistemas-gerenciar',
  standalone: true,
  imports: [
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
  templateUrl: './sistemas-gerenciar.component.html',
  styleUrls: ['./sistemas-gerenciar.component.scss'],
})
export class SistemasGerenciarComponent
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
  private readonly sistemaService = inject(SistemaService);
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
        this.dadosTabela.paginator = this.paginator;
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

  public ativaDesativar(skill: Skill) {
    skill.ativo = !skill.ativo;
  }
}

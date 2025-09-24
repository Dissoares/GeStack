import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { DialogSkillComponent } from '../dialog-skill/dialog-skill.component';
import { SistemaService, SkillService, UsuarioService } from '../../services';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../../components/index.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Sistema, Skill, Usuario } from '../../core/models';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-sistema',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dialog-sistema.component.html',
  styleUrls: ['./dialog-sistema.component.scss'],
})
export class DialogSistemaComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private listaCores: Array<string> = [
    '#FFECB3',
    '#D1C4E9',
    '#BBDEFB',
    '#E1BEE7',
    '#FFE0B2',
    '#CFD8DC',
  ];

  public listaResponsaveis: Array<Usuario> = [];
  public listaSkills: Array<Skill> = [];

  private coresMapeadas = new Map<string, string>();
  private indiceCorAtual: number = 0;

  public ehVisualizacao: boolean = false;
  public ehEdicao: boolean = false;

  private readonly sistemaService = inject(SistemaService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly toastrService = inject(ToastrService);
  private readonly skillService = inject(SkillService);
  private readonly dialog = inject(MatDialog);

  constructor(
    public dialogRef: MatDialogRef<DialogSistemaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dados: { sistema: Sistema; ehVisualizar: boolean }
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
    this.monitorarEdicao();
    this.listarSkills();
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

  public monitorarEdicao(): void {
    if (this.dados) {
      this.ehEdicao = true;
      this.formulario.patchValue({
        ...this.dados.sistema,
        skills: this.dados.sistema.skills,
      });
    }

    if (this.dados?.ehVisualizar) {
      this.ehVisualizacao = true;
      this.desabilitarFormulario();
    }
  }

  public compararSkills(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      this.toastrService.error(
        'Preencha todos os campos obrigatórios',
        'Erro!'
      );
      this.marcarFormularioComoTocado();
      return;
    }

    const sistema: Sistema = this.formulario.getRawValue();

    const requisicao = this.ehEdicao
      ? this.sistemaService.atualizar(sistema)
      : this.sistemaService.cadastrar(sistema);

    requisicao.subscribe({
      next: (resultado) => {
        if (resultado) {
          this.toastrService.success(
            `Sistema ${this.ehEdicao ? 'atualizado' : 'cadastrado'}!.`,
            'Sucesso!'
          );

          this.ehEdicao ? this.dialogRef.close(true) : this.limparFormulario();
        }
      },
      error: (erro) => {
        console.error('Erro ao salvar sistema:', erro);
        this.toastrService.error('Não foi possível salvar.', 'Erro!');
      },
    });
  }

  public cancelar(): void {
    this.limparFormulario();
    this.dialogRef.close();
  }

  public displayUsuario(usuario: Usuario): string {
    return usuario ? usuario.nome : '';
  }

  public removerResponsavelSelecionado(): void {
    this.formulario.get('responsavel')?.reset();
  }

  public pesquisarResponsavel(nome: string): void {
    this.usuarioService.buscarPor(nome).subscribe({
      next: (resultado) => {
        this.listaResponsaveis = resultado;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public listarSkills(): void {
    this.skillService.buscarTudo().subscribe({
      next: (skills: Array<Skill>) => {
        this.listaSkills = skills.filter((skills) => skills.ativo === true);
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public cadastrarSkills(): void {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(DialogSkillComponent, {
      width: '1200px',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(DialogSistemaComponent, {
        width: '1200px',
        maxWidth: '90vw',
        disableClose: false,
        backdropClass: 'fundo-modal',
        data: this.dados,
      });
      this.listarSkills();
    });
  }

  public getCoresTags(skill: Skill): string {
    if (this.coresMapeadas.has(skill.nome)) {
      return this.coresMapeadas.get(skill.nome)!;
    }
    const corSelecionada = this.listaCores[this.indiceCorAtual];
    this.coresMapeadas.set(skill.nome, corSelecionada);
    this.indiceCorAtual = (this.indiceCorAtual + 1) % this.listaCores.length;

    return corSelecionada;
  }

  public removerSkill(selecionada: Skill): void {
    const formulario = this.formulario.get('skills')?.value as Array<Skill>;
    this.formulario
      .get('skills')
      ?.setValue(formulario.filter((skill) => skill !== selecionada));
  }
}

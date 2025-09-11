import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogConfirmacaoService, SkillService } from '../../services';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SkillCategoriaEnum } from '../../core/enums';
import { campoObrigatorio } from '../../validators';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Skill } from '../../core/models';

@Component({
  selector: 'app-dialog-skill',
  standalone: true,
  imports: [
    ErrosFormularioComponent,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dialog-skill.component.html',
  styleUrls: ['./dialog-skill.component.scss'],
})
export class DialogSkillComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  private readonly dialogService = inject(DialogConfirmacaoService);
  private readonly service = inject(SkillService);
  private readonly toastr = inject(ToastrService);

  public listaCategoriaSkillsEnum = SkillCategoriaEnum.getAll();

  public dadosTabela = new MatTableDataSource<Skill>([]);
  public colunasTabela: Array<string> = [
    'id',
    'descricao',
    'categoria',
    'dataCadastro',
    'dataModificacao',
    'status',
    'acoes',
  ];
  public carregouListagem: boolean = false;
  public ehEdicao: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogSkillComponent>) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.listarSkills();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [campoObrigatorio()]],
      categoria: [null, [campoObrigatorio()]],
      dataCriacao: [null],
      dataModificacao: [null],
      modificadoPor: [null],
      ativo: [null],
    });
  }

  public iniciarPaginacao() {
    setTimeout(() => {
      this.dadosTabela.paginator = this.paginator;
    }, this.dadosTabela.data.length);

    this.carregouListagem = true;
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      this.marcarFormularioComoTocado();
      return;
    }

    const skill: Skill = this.formulario.getRawValue();
    const metodo = this.ehEdicao
      ? this.service.atualizar(skill)
      : this.service.cadastrar(skill);

    metodo.subscribe({
      next: (resultado) => {
        if (resultado) {
          const msg = this.ehEdicao
            ? 'Skill atualizada com sucesso!'
            : 'Skill cadastrada com sucesso!';
          this.toastr.success(msg, 'Sucesso!');
        }

        this.limparFormulario();
        this.listarSkills();
      },
      error: (erro) => {
        if (erro.status === 409) {
          this.formulario.get('nome')?.setErrors({ nomeDuplicado: true });
          return;
        }

        this.toastr.error('Erro inesperado.', erro.status);
        console.error(erro);
      },
    });
  }

  public listarSkills(): void {
    this.service.buscarTudo().subscribe({
      next: (resultado) => {
        this.dadosTabela.data = resultado;
        this.iniciarPaginacao();
      },
      error: (erro) => {
        erro && erro.message
          ? this.toastr.error('Erro ao carregar skills', erro.message)
          : null;
      },
    });
  }

  public ativaDesativar(skill: Skill) {
    skill.ativo = !skill.ativo;

    this.service.ativaDesativar(skill).subscribe({
      next: (resultado) => {
        if (resultado.ativo) {
          this.toastr.success('Ativado com sucesso!..', 'Sucesso!');
        } else if (!resultado.ativo) {
          this.toastr.info('Skill desativada.', 'Informação!');
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
          'Não foi possível alterar o status da skill',
          erro?.message
        );
      },
    });
  }

  public getDescricaoSkill(id: number): string {
    return SkillCategoriaEnum.getById(id)?.descricao || '';
  }

  public editar(skill: Skill): void {
    if (this.formulario.valid) {
      this.toastr.info('Só é possivel uma edição por vez', 'Aviso!');
      return;
    }
    this.formulario.patchValue(skill);

    const index = this.dadosTabela.data.indexOf(skill);
    if (index > -1) {
      this.dadosTabela.data.splice(index, 1);

      this.iniciarPaginacao();
      this.ehEdicao = true;
    }
  }

  public cancelar(): void {
    const dados: Skill = this.formulario.value;

    if (this.ehEdicao) {
      this.dadosTabela.data.unshift(dados);
      this.iniciarPaginacao();
    }
    this.limparFormulario();
    this.ehEdicao = false;
    this.dialogRef.close();
  }

  public excluir(idSkill: number): void {
    this.dialogService
      .openDialog({
        titulo: 'Confirmação!',
        acao: 'Excluir',
        textoConfirmacao: 'Excluir',
        textoCancelamento: 'Cancelar',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this.service.excluir(idSkill).subscribe({
            next: () => {
              this.toastr.success('Excluído com sucesso!', 'Sucesso!');
              this.dadosTabela.data = this.dadosTabela.data.filter(
                (s) => s.id !== idSkill
              );
              this.iniciarPaginacao();
            },
            error: (erro) => {
              this.toastr.error('Não foi excluir essa skill', erro?.message);
            },
          });
        }
      });
  }
}

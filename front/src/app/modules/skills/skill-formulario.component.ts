import {
  ChangeDetectorRef,
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../components/index.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SkillCategoriaEnum } from '../../core/enums';
import { campoObrigatorio } from '../../validators';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Skill } from '../../core/models';

@Component({
  selector: 'app-skill-formulario',
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
  templateUrl: './skill-formulario.component.html',
  styleUrls: ['./skill-formulario.component.scss'],
})
export class SkillFormularioComponent
  extends CamposFormularioComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  private readonly service = inject(SkillService);
  private readonly toastr = inject(ToastrService);
  private readonly cdr = inject(ChangeDetectorRef);

  public listaCategoriaSkillsEnum: Array<SkillCategoriaEnum> =
    SkillCategoriaEnum.getAll();

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
  public ehEdicao: boolean = false;

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
    this.listarSkills();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSkill: [null],
      nome: [null, [campoObrigatorio()]],
      categoria: [null, [campoObrigatorio()]],
      dataCriacao: [null],
      dataModificacao: [null],
      modificadoPor: [null],
      ativo: [{ value: true, disabled: true }],
    });
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
        this.preencherEDesativarCampoStatus();
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
        !resultado.length
          ? this.toastr.info('Nenhum resultado encontrado.', 'Informação!')
          : null;

        this.dadosTabela.data = resultado;
        this.dadosTabela.paginator = this.paginator;
      },
      error: (erro) => {
        erro && erro.message
          ? this.toastr.error('Erro ao carregar skills', erro)
          : null;
      },
    });
  }

  public ativaDesativar(skill: Skill) {
    this.service.ativaDesativar(skill).subscribe({
      next: (resultado) => {
        if (resultado.ativo) {
          this.toastr.success('Skill reativada com sucesso!..', 'Sucesso!');
        } else {
          this.toastr.info('Skill desativada.', 'Informação!');
        }
        const index = this.dadosTabela.data.findIndex(
          (s) => s.idSkill === resultado.idSkill
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
    this.formulario.get('ativo')?.enable();

    const index = this.dadosTabela.data.indexOf(skill);
    if (index > -1) {
      this.dadosTabela.data.splice(index, 1);

      if (this.paginator) {
        this.dadosTabela.paginator = this.paginator;
      }

      this.ehEdicao = true;
      this.cdr.detectChanges();
    }
  }

  public cancelar(): void {
    const dados: Skill = this.formulario.value;

    if (this.ehEdicao) {
      this.dadosTabela.data.unshift(dados);
      if (this.paginator) {
        this.dadosTabela.paginator = this.paginator;
      }
    }

    this.limparFormulario();

    this.ehEdicao = false;
    this.preencherEDesativarCampoStatus();
  }

  public preencherEDesativarCampoStatus(): void {
    this.formulario.get('ativo')?.setValue(true);
    this.formulario.get('ativo')?.disable();
  }
}

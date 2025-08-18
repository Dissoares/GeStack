import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../../components/index.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SkillCategoriaEnum } from '../../core/enums';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Skill } from '../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './skill-formulario.component.html',
  styleUrls: ['./skill-formulario.component.scss'],
})
export class SkillFormularioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  private readonly service = inject(SkillService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

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

  public ngOnInit() {
    this.criarFormulario();
    if (this.ehEdicao || !this.ehEdicao) this.listarSkills();
    setTimeout(() => {
      this.dadosTabela.paginator = this.paginator;
      this.cdr.detectChanges();
    }, 1000);
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSkill: [null],
      descricao: [null, Validators.required],
      categoria: [null, Validators.required],
      dataCadastro: [null],
      dataModificacao: [null],
      modificadoPor: [null],
      ativo: [{ value: true, disabled: true }],
    });
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Erro!');
      this.marcarFormularioComoTocado();
      return;
    }

    const skill: Skill = this.formulario.value;
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
        const msg = this.ehEdicao
          ? 'Não foi possível atualizar a Skill'
          : 'Erro ao cadastrar a Skill';
        this.toastr.error(msg, 'Erro');
        console.error(erro);
      },
    });
  }

  public listarSkills(): void {
    this.service.buscarTudo().subscribe({
      next: (resultado) => {
        if (!resultado.length) {
          this.toastr.info('Nenhum resultado encontrado.', 'Informação!');
        }
        this.dadosTabela.data = resultado;
        setTimeout(() => {
          this.dadosTabela.paginator = this.paginator;
          this.cdr.detectChanges();
        });
      },
      error: (erro) => {
        this.toastr.error('Erro ao carregar skills', erro);
      },
    });
  }

  public desativar(idSkill: number) {
    this.service.desativar(idSkill).subscribe({
      next: (resultado) => {
        resultado
          ? this.toastr.success('Skill desativada com sucesso!.', 'Sucesso!')
          : null;
      },
      error: (erro) => {
        this.toastr.error('Não foi possível desativar essa Skill', erro);
      },
    });
  }

  public editar(skill: Skill): void {
    this.formulario.patchValue(skill);
    this.formulario.get('ativo')?.enable();
    this.dadosTabela.data = this.dadosTabela.data.filter((s) => s !== skill);
    this.ehEdicao = true;
  }

  public getDescricaoSkill(id: number): string {
    return SkillCategoriaEnum.getById(id)?.descricao || '';
  }

  public cancelar(): void {
    const status = this.formulario.get('ativo')?.value;
    this.limparFormulario();
    this.formulario.get('ativo')?.setValue(status);
    this.ehEdicao = false;
  }
}

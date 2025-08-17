import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CamposFormularioComponent } from '../../components/index.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RotasEnum, SkillCategoriaEnum } from '../../core/enums';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Skill } from '../../core/models';
import { SkillService } from '../../services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    'status',
    'acoes',
  ];

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
    this.listarSkills();
    setTimeout(() => {
      this.dadosTabela.paginator = this.paginator;
      this.cdr.detectChanges();
    },1000);
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSkill: [null],
      descricao: [null, Validators.required],
      categoria: [null, Validators.required],
      ativo: [{ value: true, disabled: true }],
    });
  }

  public cadastrar(): void {
    if (this.formulario.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Erro!');
      this.marcarFormularioComoTocado();
      return;
    }

    const skill: Skill = this.formulario.value;

    this.service.cadastrar(skill).subscribe({
      next: (resultado) => {
        resultado
          ? this.toastr.success('Skill cadastrada com sucesso!', 'Sucesso')
          : null;
        this.limparFormulario();
        this.listarSkills();
      },
      error: (erro) => {
        console.error(erro);
        this.toastr.error('Erro ao cadastrar a skill', 'Erro');
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
        this.toastr.error('Erro ao carregar skills', 'Erro');
      },
    });
  }

  public getDescricaoSkill(id: number): string {
    return SkillCategoriaEnum.getById(id)?.descricao || '';
  }

  public cancelar(): void {
    this.limparFormulario();
    this.router.navigate([RotasEnum.HOME]);
  }

  public desativar(id: number) {}
}

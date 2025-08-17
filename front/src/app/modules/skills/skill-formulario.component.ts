import { Component, inject, OnInit } from '@angular/core';
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
  ],
  templateUrl: './skill-formulario.component.html',
  styleUrls: ['./skill-formulario.component.scss'],
})
export class SkillFormularioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private readonly service = inject(SkillService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public listaCategoriaSkillsEnum: Array<SkillCategoriaEnum> =
    SkillCategoriaEnum.getAll();

  public listaSkills: Array<Skill> = [];

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
    this.listarSkills();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSkill: [null],
      descricao: [null, Validators.required],
      categoria: [null, Validators.required],
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
        !resultado.length
          ? this.toastr.info('Nenhum resultado encrontrado.', 'Informação!')
          : (this.listaSkills = resultado);
      },
      error: (erro) => {
        this.toastr.error('Erro ao carregar skills', 'Erro');
      },
    });
  }

  public cancelar(): void {
    this.limparFormulario();
    this.router.navigate([RotasEnum.HOME]);
  }
}

import { CamposFormularioComponent } from '../../../components/index.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RotasEnum, SkillsEnum } from '../../../core/enums';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SistemaService } from '../../../services';
import { Sistema } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sistemas-formulario',
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
    MatChipsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './sistemas-formulario.component.html',
  styleUrls: ['./sistemas-formulario.component.scss'],
})
export class SistemasFormularioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private readonly sistemaService = inject(SistemaService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  public listaSkillsEnum: Array<SkillsEnum> = SkillsEnum.getAll();

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idSistema: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      skills: [null, Validators.required],
      areaResponsavel: [null],
      linkPrototipo: [null],
      linkDocumentacao: [null],
      linkGit: [null],
    });
  }

  public cadastrar(): void {
    if (this.formulario.invalid) {
      this.toastrService.error(
        'Preencha todos os campos obrigatórios',
        'Erro!'
      );
      this.marcarFormularioComoTocado();
      return;
    }

    const sistema: Sistema = this.formulario.value;

    const listaId = this.formulario.value.skills.map(
      (skill: SkillsEnum) => skill.id
    );

    sistema.skills = listaId;

    this.sistemaService.cadastrar(sistema).subscribe({
      next(resultado) {},
      error(erro) {},
    });
  }

  public cancelar(): void {
    this.limparFormulario();
    this.router.navigate([RotasEnum.HOME]);
  }
}

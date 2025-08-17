import { CamposFormularioComponent } from '../../../components/index.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SistemaService } from '../../../services';
import { RotasEnum } from '../../../core/enums';
import { Sistema } from '../../../core/models';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
      stack: [null, Validators.required],
      areaResponsavel: [null],
      linkPrototipo: [null],
      linkDocumentacao: [null],
      linkGit: [null],
    });
  }

  public cadastrar(): void {
    const sistema: Sistema = this.formulario.value;

    if (this.formulario.invalid) {
      this.toastrService.error('Preencha todos os campos obrigatórios', 'Erro!');
      this.marcarFormularioComoTocado();
      return;
    }

    this.sistemaService.cadastrar(sistema).subscribe({
      next(resultado) {
        console.log('💡resultado', resultado);
      },
      error(erro) {
        console.log('erro', erro);
      },
    });
  }

  public cancelar(): void {
    this.limparFormulario();
    this.router.navigate([RotasEnum.HOME]);
  }
}

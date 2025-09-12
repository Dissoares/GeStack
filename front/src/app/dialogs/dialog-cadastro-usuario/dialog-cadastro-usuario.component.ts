import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../components/index.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { campoObrigatorio } from '../../validators';
import { UsuarioService } from '../../services';
import { CommonModule } from '@angular/common';
import { PerfilEnum } from '../../core/enums';
import { Usuario } from '../../core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-cadastro-usuario',
  standalone: true,
  imports: [
    ErrosFormularioComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './dialog-cadastro-usuario.component.html',
  styleUrls: ['./dialog-cadastro-usuario.component.scss'],
})
export class DialogCadastroUsuarioComponent
  extends CamposFormularioComponent
  implements OnInit
{
  private readonly usuarioService = inject(UsuarioService);
  private readonly toastr = inject(ToastrService);

  public listaPerfilEnum = PerfilEnum.getAll();

  public mostrarConfirmarSenha: boolean = false;
  public mostrarSenha: boolean = false;
  public ehEdicao: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCadastroUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [campoObrigatorio()]],
      email: [null, [campoObrigatorio()]],
      senha: [null, [campoObrigatorio()]],
      confirmarSenha: [null, [campoObrigatorio()]],
      perfil: [null, [campoObrigatorio()]],
    });
  }

  public preencherFormulario(): void {
    if (this.usuario) {
      this.ehEdicao = true;
      this.formulario.patchValue(this.usuario);
      this.formulario.get('senha')?.clearValidators();
      this.formulario.get('confirmarSenha')?.clearValidators();
      this.formulario.updateValueAndValidity();
    }
  }
  public salvar(): void {
    const formulario = this.formulario;

    if (formulario.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios!', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const { senha, confirmarSenha } = formulario.value;

    if (senha !== confirmarSenha) {
      this.toastr.error('As senhas não coincidem.', 'Aviso');
      return;
    }

    const usuario: Usuario = formulario.value;

    if (!usuario.id) {
      this.executarAcao(this.usuarioService.salvar(usuario));
    } else {
      this.executarAcao(this.usuarioService.atualizar(usuario));
    }
  }

  public executarAcao(dados: any): void {
    dados.subscribe({
      next: () => {
        this.limparFormulario();
        this.dialogRef.close(this.ehEdicao ? 'atualizado' : 'salvo');
      },
      error: (resposta: HttpErrorResponse) => {
        this.toastr.error(resposta.error, 'Erro!');
      },
    });
  }

  public cancelar(): void {
    this.dialogRef.close('cancelado');
  }
}

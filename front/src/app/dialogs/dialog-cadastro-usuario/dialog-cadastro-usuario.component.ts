import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../components/index.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<DialogCadastroUsuarioComponent>) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      nome: [null, [campoObrigatorio()]],
      email: [null, [campoObrigatorio()]],
      senha: [null, [campoObrigatorio()]],
      confirmarSenha: [null, [campoObrigatorio()]],
      perfil: [null, [campoObrigatorio()]],
    });
  }

  public salvar(): void {
    const dadosForm = this.formulario;

    if (dadosForm.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios!', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const { senha, confirmarSenha } = dadosForm.value;

    if (senha !== confirmarSenha) {
      this.toastr.error('As senhas não coincidem.', 'Aviso');
      return;
    }

    const usuario: Usuario = this.formulario.value;

    this.usuarioService.salvar(usuario).subscribe({
      next: (resposta: HttpResponse<string>) => {
        this.limparFormulario();
        this.dialogRef.close('salvo');
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

import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../components/index.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, UsuarioService } from '../services';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { campoObrigatorio } from '../validators';
import { CommonModule } from '@angular/common';
import { PerfilEnum } from '../core/enums';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../core/models';
import { LoginDto } from '../core/dtos';

@Component({
  selector: 'app-auth',
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
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends CamposFormularioComponent implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  public listaPerfilEnum = PerfilEnum.getAll();

  public mostrarConfirmarSenha: boolean = false;
  public mostrarSenha: boolean = false;
  public ehCadastro: boolean = false;

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      nome: [null],
      email: [null, [campoObrigatorio]],
      senha: [null, [campoObrigatorio]],
      confirmarSenha: [null],
      perfil: [null],
    });

    if (this.ehCadastro) {
      this.formulario.get('nome')?.addValidators([campoObrigatorio]);
      this.formulario.get('confirmarSenha')?.addValidators([campoObrigatorio]);
      this.formulario.get('perfil')?.addValidators([campoObrigatorio]);
    }
  }

  public cadastrar(): void {
    const dadosForm = this.formulario;

    if (dadosForm.untouched || dadosForm.invalid) {
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
        this.toastr.success('Cadastrado com sucesso!', 'Sucesso!');
        this.ehCadastro = false;
        this.limparFormulario();
        this.marcarFormularioComoNAOTocado();
      },
      error: (resposta: HttpErrorResponse) => {
        this.toastr.error(resposta.error, 'Erro!');
      },
    });
  }

  public login(): void {
    const dadosForm = this.formulario;

    if (dadosForm.untouched || dadosForm.invalid) {
      this.toastr.error('Preencha seus dados de acesso', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const { email, senha } = this.formulario.value;
    const login: LoginDto = { email, senha };

    this.authService.login(login).subscribe({
      next: () => {
        this.toastr.success('Logado com sucesso.', 'Sucesso!');
        this.authService.redirecionarComBaseNoPerfil();
      },
      error: (erro) => {
        const msg = erro?.error?.message;
        this.toastr.error(msg, 'Erro!');
      },
    });
  }
}

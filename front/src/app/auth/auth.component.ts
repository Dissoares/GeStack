import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../components/index.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, UsuarioService } from '../services';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PerfilEnum } from '../core/enums';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../core/models';
import { LoginDto } from '../core/dtos';

@Component({
  selector: 'app-auth',
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
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends CamposFormularioComponent implements OnInit {
  public listaPerfilEnum = PerfilEnum.getAll();
  public ehCadastro: boolean = false;

  private readonly usuarioService = inject(UsuarioService);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      confirmarSenha: [null],
      perfil: [null],
    });

    if (this.ehCadastro) {
      this.formulario.get('nome')?.addValidators(Validators.required);
      this.formulario.get('confirmarSenha')?.addValidators(Validators.required);
      this.formulario.get('perfil')?.addValidators(Validators.required);
    }
  }

  public cadastrar(): void {
    if (this.formulario.invalid) {
      this.exibirMensagem('Preencha todos os campos obrigatórios!', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const usuario: Usuario = this.formulario.value;

    this.usuarioService.salvar(usuario).subscribe({
      next: (resposta: HttpResponse<string>) => {
        this.exibirMensagem('Cadastrado com sucesso!', 'Sucesso!');
        this.ehCadastro = false;
        this.limparFormulario();
        this.marcarFormularioComoNAOTocado();
      },
      error: (resposta: HttpErrorResponse) => {
        this.exibirMensagem(resposta.error, 'Erro!');
      },
    });
  }

  public login(): void {
    if (this.formulario.invalid) {
      this.exibirMensagem('Preencha seus dados de acesso', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const { email, senha } = this.formulario.value;
    const login: LoginDto = { email, senha };

    this.authService.login(login).subscribe({
      next: () => {
        this.exibirMensagem('Logado com sucesso.', 'Sucesso!');
      },
      error: (erro) => {
        const msg = erro?.error?.message;
        this.exibirMensagem(msg, 'Erro!');
      },
    });
  }

  private exibirMensagem(
    mensagem: string,
    tipo: 'Sucesso!' | 'Erro!' | 'Aviso!' | 'Info!'
  ): void {
    const config = { timeOut: 2000, closeButton: true, progressBar: true };
    const mapTipo = {
      'Sucesso!': () => this.toastr.success(mensagem, tipo, config),
      'Erro!': () => this.toastr.error(mensagem, tipo, config),
      'Aviso!': () => this.toastr.warning(mensagem, tipo, config),
      'Info!': () => this.toastr.info(mensagem, tipo, config),
    };
    mapTipo[tipo]();
  }
}

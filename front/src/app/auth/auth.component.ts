import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../components/index.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, UsuarioService } from '../services';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NivelAcessoEnum } from '../core/enums';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../core/models';
import { LoginDto } from '../core/dtos';
import { DateTime } from 'luxon';

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
  public listaNivelAcessoEnum: Array<NivelAcessoEnum> =
    NivelAcessoEnum.getAll();
  public ehCadastro: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nome: [null],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      confirmarSenha: [null],
      nivelAcesso: [null],
      dataCadastro: [null],
      status: [null],
    });

    if (this.ehCadastro) {
      this.formulario.get('nome')?.addValidators(Validators.required);
      this.formulario.get('confirmarSenha')?.addValidators(Validators.required);
      this.formulario.get('nivelAcesso')?.addValidators(Validators.required);
    }
  }

  public cadastrar(): void {
    if (this.formulario.invalid) {
      this.exibirMensagem('Preencha todos os campos obrigatórios!', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const dadosCadastro: Usuario = {
      ...this.formulario.value,
      dataCadastro: this.dataDeHojeFormatada(),
    };

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      this.exibirMensagem('Senhas não coincidem!', 'Aviso!');
      return;
    }

    this.usuarioService.cadastro(dadosCadastro).subscribe({
      next: () => {
        this.exibirMensagem('Cadastro realizado com sucesso!', 'Sucesso!');
        this.ehCadastro = false;
        this.formulario.reset();
      },
      error: () => this.exibirMensagem('Não foi possível cadastrar!', 'Erro!'),
    });
  }

  public login(): void {
    if (this.formulario.invalid) {
      this.exibirMensagem('Preencha seus dados de acesso', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    const { email, senha } = this.formulario.value;
    const dadosLogin: LoginDto = { email, senha };

    this.authService.login(dadosLogin).subscribe({
      next: () => {
        this.exibirMensagem('Logado com sucesso.', 'Sucesso!');
        setTimeout(() => window.location.reload(), 500);
      },
      error: () => this.exibirMensagem('Erro ao fazer login.', 'Erro!'),
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

  private dataDeHojeFormatada(): string {
    return DateTime.now()
      .setZone('America/Sao_Paulo')
      .toFormat('dd/MM/yyyy HH:mm');
  }
}

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../components/index.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NivelAcessoEnum, RotasEnum } from '../core/enums';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService, UsuarioService } from '../services';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    NivelAcessoEnum.getTodosNiveisAcesso();
  public ehCadastro: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nome: [null, this.ehCadastro ? [Validators.required] : null],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, this.ehCadastro ? [Validators.required] : null],
      nivelAcesso: [null, this.ehCadastro ? [Validators.required] : null],
      dataCadastro: [null],
      ativo: [null],
    });
  }

  public cadastrar(): void {
    const dadosCadastro: Usuario = this.formulario.value;
    const dataLuxon = DateTime.now().setZone('America/Sao_Paulo');
    const dataFormatada = dataLuxon.toFormat('dd/MM/yyyy HH:mm');
    dadosCadastro.dataCadastro = dataFormatada;

    if (
      !dadosCadastro.nome ||
      !dadosCadastro.email ||
      !dadosCadastro.nivelAcesso ||
      !dadosCadastro.senha
    ) {
      this.exibirMensagem('Preencha todos os campos obrigatórios!', 'Aviso!');
      return;
    }

    if (!dadosCadastro.confirmarSenha) {
      this.exibirMensagem('Digite a confirmação de senha!', 'Aviso!');
      return;
    }

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      this.exibirMensagem('Senhas não coincidem!', 'Aviso!');
      return;
    }

    this.usuarioService.cadastro(dadosCadastro).subscribe({
      next: () => {
        this.exibirMensagem('Cadastro realizado com sucesso!', 'Sucesso!'),
          (this.ehCadastro = false);
        this.formulario.reset();
      },
      error: () => {
        this.exibirMensagem('Não foi possivél cadastrar!', 'Erro!');
      },
    });
  }

  public login(): void {
    const { email, senha } = this.formulario.value;
    const dadosLogin: LoginDto = { email, senha };

    if (!dadosLogin.email || !dadosLogin.senha) {
      this.exibirMensagem('Preencha seus dados de acesso', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    this.authService.login(dadosLogin).subscribe({
      next: (resultado: any) => {
        if (resultado) {
          this.exibirMensagem('Logado com sucesso.', 'Sucesso!');

          setTimeout(() => {
            this.redirecionarComBaseNoNivelAcesso();
          }, 1000);
        }
      },
      error: () => {
        this.exibirMensagem('Erro ao fazer login.', 'Erro!');
      },
    });
  }

  public redirecionarComBaseNoNivelAcesso(): void {
    const nivelAcesso = this.usuarioService.getNivelAcesso();

    if (nivelAcesso === NivelAcessoEnum.ADMIN.id) {
      this.router.navigate([
        RotasEnum.ADMINISTRADOR.ROTA + '/' + RotasEnum.ADMINISTRADOR.LISTAGEM,
      ]);
      return;
    }

    if (
      nivelAcesso === NivelAcessoEnum.LIDER_NEGOCIO.id ||
      nivelAcesso === NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id
    ) {
      this.router.navigate([
        RotasEnum.LIDER.ROTA + '/' + RotasEnum.LIDER.LISTAGEM,
      ]);
      return;
    }

    if (
      nivelAcesso === NivelAcessoEnum.ANALISTA.id ||
      nivelAcesso === NivelAcessoEnum.DESENVOLVEDOR.id
    ) {
      this.router.navigate([
        RotasEnum.USUARIO.ROTA + '/' + RotasEnum.USUARIO.LISTAGEM,
      ]);
      return;
    }
  }

  public exibirMensagem(mensagem: string, tipo: string): void {
    const configuracoes = {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    };

    tipo === 'Sucesso!'
      ? this.toastr.success(mensagem, tipo, configuracoes)
      : tipo === 'Erro!'
      ? this.toastr.error(mensagem, tipo, configuracoes)
      : tipo === 'Aviso!'
      ? this.toastr.warning(mensagem, tipo, configuracoes)
      : this.toastr.info(mensagem, tipo, configuracoes);
  }
}

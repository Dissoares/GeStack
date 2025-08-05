import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposFormularioComponent } from '../components/index.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NivelAcessoEnum, RotasEnum } from '../core/enums';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { Usuario } from '../core/models';
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
    private auth: AuthService,
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
      dataCriacao: [null],
      ativo: [true],
    });
  }

  public cadastrar(): void {
    const dadosCadastro: Usuario = this.formulario.value;
    const dataLuxon = DateTime.now().setZone('America/Sao_Paulo');
    const dataFormatada = dataLuxon.toFormat('dd/MM/yyyy HH:mm');
    dadosCadastro.dataCriacao = dataFormatada;

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

    this.auth.cadastro(dadosCadastro).subscribe({
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
    const dadosLogin: Usuario = this.formulario.value;

    this.auth.login(dadosLogin).subscribe({
      next: () => {
        const nivel = this.auth.getNivelAcesso();
        switch (nivel) {
          case 1:
            this.router.navigate([RotasEnum.ADMINISTRADOR.LISTAGEM]);
            break;
          case 2:
            this.router.navigate([RotasEnum.LIDER_DESENVOLVIMENTO.LISTAGEM]);
            break;
          case 3:
            this.router.navigate([RotasEnum.LIDER_NEGOCIO.LISTAGEM]);
            break;
          case 4:
            this.router.navigate([RotasEnum.DESENVOLVEDOR.LISTAGEM]);
            break;
          default:
            this.router.navigate([RotasEnum.ANALISTA.LISTAGEM]);
        }
      },
      error: () => {
        this.exibirMensagem('Erro ao fazer login.', 'Erro!');
      },
    });
  }

  public exibirMensagem(mensagem: string, tipo: string): void {
    const configuracoes = {
      timeOut: 5000,
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

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
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { Usuario } from '../core/models';

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

  constructor(private auth: AuthService, private router: Router) {
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
      ativo: [true],
    });
  }

  public cadastrar(): void {
    const dadosCadastro: Usuario = this.formulario.value;

    if (
      !dadosCadastro.nome ||
      !dadosCadastro.email ||
      !dadosCadastro.nivelAcesso ||
      !dadosCadastro.senha
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (!dadosCadastro.confirmarSenha) {
      alert('Digite a confirmação de senha!');
      return;
    }

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      alert('Senhas não coincidem!');
      return;
    }

    this.auth.cadastro(dadosCadastro).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.ehCadastro = false;
        this.formulario.reset();
      },
      error: () => alert('Erro ao cadastrar.'),
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
      error: () => alert('Erro ao fazer login.'),
    });
  }
}

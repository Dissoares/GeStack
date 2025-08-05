import { CamposFormularioComponent } from '../components/index.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NivelAcessoEnum } from '../core/enums';
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
      nome: [null],
      email: [null],
      senha: [null],
      confirmarSenha: [null],
      nivelAcesso: [null],
      ativo: [true],
    });
  }

  public cadastro(): void {
    const dadosCadastro: Usuario = this.formulario.value;

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
            this.router.navigate(['/admininstrador']);
            break;
          case 2:
            this.router.navigate(['/lider-desenvolvimento']);
            break;
          case 3:
            this.router.navigate(['/lider-negocio']);
            break;
          case 4:
            this.router.navigate(['/desenvolvedor']);
            break;
          default:
            this.router.navigate(['/analista']);
        }
      },
      error: () => alert('Erro ao fazer login.'),
    });
  }
}

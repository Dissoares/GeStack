import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CamposFormularioComponent } from '../components/index.component';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { Usuario } from '../core/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardActions,
    MatFormField,
    MatInput,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends CamposFormularioComponent implements OnInit {
  public ehCadastro: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    super(inject(FormBuilder));
  }

  public ngOnInit() {
    this.criarFormulario();
  }

  public criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nome: [null],
      usuario: [null],
      senha: [null],
      confirmarSenha: [null],
      permissao: [null],
      ativo: [null],
    });
  }

  public cadastro(): void {
    const dadosCadastro: Usuario = this.formulario.value;

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      return;
    }

    this.auth.cadastro(dadosCadastro).subscribe({
      next: () => {},
      error: () => {},
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
      error: () => {},
    });
  }
}

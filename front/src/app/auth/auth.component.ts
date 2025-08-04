import { CamposFormularioComponent } from '../components/index.component';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { Usuario } from '../core/models';

@Component({
  selector: 'app-auth',
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
            this.router.navigate(['/admin']);
            break;
          case 2:
            this.router.navigate(['/lider-dev']);
            break;
          case 3:
            this.router.navigate(['/lider-negocio']);
            break;
          case 4:
            this.router.navigate(['/usuario']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: () => {},
    });
  }
}

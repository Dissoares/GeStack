import { CamposFormularioComponent } from '../../components/index.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioToken } from '../../core/interfaces';
import { CommonModule } from '@angular/common';
import { PerfilEnum } from '../../core/enums';
import { AuthService } from '../../services';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
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
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent
  extends CamposFormularioComponent
  implements OnInit
{
  public listaPerfilEnum = PerfilEnum.getAll();
  public ehEdicao: boolean = false;

  constructor(private authService: AuthService) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      idUsuario: [null],
      nome: [null],
      email: [null],
      senha: [null],
      confirmarSenha: [null],
      perfil: [null],
      dataCriacao: [null],
      ativo: [null],
    });
  }

  public preencherFormulario(): void {
    this.authService.usuarioLogado$.subscribe({
      next: (usuario) => {
        if (usuario?.dataCriacao) {
          usuario.dataCriacao = DateTime.fromISO(usuario.dataCriacao)
            .setLocale('pt-BR')
            .toFormat('dd/MM/yyyy');
        }

        this.formulario.patchValue(usuario as UsuarioToken);
        this.desabilitarFormulario();
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public editarDadosPerfil(): void {
    this.preencherFormulario();
    this.habilitarFormulario();
    this.ehEdicao = true;
  }
}

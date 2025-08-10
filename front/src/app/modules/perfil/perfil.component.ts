import { CamposFormularioComponent } from '../../components/index.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NivelAcessoEnum } from '../../core/enums';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';

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
  public listaNivelAcessoEnum: Array<NivelAcessoEnum> =
    NivelAcessoEnum.getAll();
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
      nivelAcesso: [null],
      dataCadastro: [null],
      ativo: [null],
    });
  }

  public preencherFormulario(): void {
    this.authService.usuarioLogado$.subscribe((usuario) => {
      if (usuario) {
        this.formulario.patchValue(usuario);
        this.desabilitarFormulario();
      }
    });
  }

  public editarDadosPerfil(): void {
    this.preencherFormulario();
    this.habilitarFormulario();
    this.ehEdicao = true;
  }
}

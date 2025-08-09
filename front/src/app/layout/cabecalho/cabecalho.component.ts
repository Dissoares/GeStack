import { CamposFormularioComponent } from '../../components/index.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioToken } from '../../core/interfaces/usuario-token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NivelAcessoEnum } from '../../core/enums';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent
  extends CamposFormularioComponent
  implements OnInit
{
  @Output() public ativarSidebar = new EventEmitter<void>();

  public usuarioLogado?: UsuarioToken | null;
  public notificacoes = 3;

  constructor(private authService: AuthService, private router: Router) {
    super(new FormBuilder());
  }

  public ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  public ativarBarraLateral(): void {
    this.ativarSidebar.emit();
  }

  private carregarUsuarioLogado(): void {
    this.authService.usuarioLogado$.subscribe((user) => {
      this.usuarioLogado = user;
    });
  }

  public pegarPrimeiraLetraDoNome(nomeUsuario?: string): string {
    if (!nomeUsuario) return '';
    return nomeUsuario.charAt(0).toUpperCase();
  }

  public getDescricaoNivelAcesso(id: any): string {
    return NivelAcessoEnum.getById(id)?.nivel || '';
  }

  public abrirPerfil(): void {}

  public abrirConfiguracoes(): void {}

  public alterarSenha(): void {}

  public logout(): void {
    this.authService.logout();
  }
}

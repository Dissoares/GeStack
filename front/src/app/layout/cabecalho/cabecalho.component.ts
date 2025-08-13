import {
  EventEmitter,
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UsuarioToken } from '../../core/interfaces/usuario-token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NivelAcessoEnum } from '../../core/enums';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
export class CabecalhoComponent implements OnInit, OnDestroy {
  @Output() public ativarSidebar = new EventEmitter<void>();

  public usuarioLogado?: UsuarioToken | null;
  public tempoRestante: string = '';
  private intervalo?: any;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  public ngOnDestroy(): void {
    this.pararContador();
  }

  public ativarBarraLateral(): void {
    this.ativarSidebar.emit();
  }

  public carregarUsuarioLogado(): void {
    this.authService.usuarioLogado$.subscribe((usuario) => {
      if (usuario) {
        this.usuarioLogado = usuario;
        this.iniciarContador();
      } else {
        this.tempoRestante = '';
        this.pararContador();
      }
    });
  }

  private pararContador(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  public pegarPrimeiraLetraDoNome(nomeUsuario?: string): string {
    return nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : '';
  }

  public getDescricaoNivelAcesso(id: any): string {
    return NivelAcessoEnum.getById(id)?.nivel || '';
  }

  public abrirPerfil(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/administrador/perfil']);
    } else if (this.authService.isGeralLider()) {
      this.router.navigate(['/lideranca/perfil']);
    } else if (this.authService.isGeralMembro()) {
      this.router.navigate(['/membro/perfil']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  public abrirConfiguracoes(): void {}
  public alterarSenha(): void {}
  public logout(): void {
    this.authService.logout();
  }

  private iniciarContador(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      this.pararContador();

      this.intervalo = setInterval(() => {
        const agora = Date.now();
        const diff = exp - agora;

        if (diff <= 0) {
          this.tempoRestante = 'Expirado';
          this.authService.logout();
          return;
        }

        const horas = Math.floor(diff / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diff % (1000 * 60)) / 1000);

        this.tempoRestante =
          `${horas.toString().padStart(2, '0')}:` +
          `${minutos.toString().padStart(2, '0')}:` +
          `${segundos.toString().padStart(2, '0')}`;
      }, 1000);
    } catch (e) {
      console.error('Erro ao decodificar token para contador', e);
    }
  }
}

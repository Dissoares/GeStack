import {
  EventEmitter,
  Component,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { UsuarioToken } from '../../core/interfaces/usuario-token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalAcessoExpiradoComponent } from '../../dialogs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PerfilEnum } from '../../core/enums';
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
  readonly dialog = inject(MatDialog);

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

  public getDescricaoPerfil(id: any): string {
    return PerfilEnum.getById(id)?.descricao || '';
  }

  public abrirPerfil(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/administracao/perfil']);
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
    const token = this.authService.token$.value;

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
          this.pararContador();
          this.abrirModaAcesso();
          return;
        }

        const horas = Math.floor(diff / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diff % (1000 * 60)) / 1000);

        this.tempoRestante =
          `${horas.toString().padStart(2, '0')}:` +
          `${minutos.toString().padStart(2, '0')}:` +
          `${segundos.toString().padStart(2, '0')}`;
      });
    } catch (e) {
      console.error('Erro ao decodificar token para contador', e);
    }
  }

  public isWarning(): boolean {
    if (!this.tempoRestante) return false;
    const minutos = Number(this.tempoRestante.split(':')[1] ?? 0);
    return minutos < 3;
  }

  public abrirModaAcesso(): void {
    const dialogRef = this.dialog.open(ModalAcessoExpiradoComponent, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'logout') {
        this.authService.logout();
      }
    });
  }
}

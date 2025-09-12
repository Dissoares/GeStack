import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BotaoMenu } from '../../core/interfaces';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLateralComponent implements OnInit {
  public perfilUsuario!: number;
  public botoesMenu: Array<BotaoMenu> = [];

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.iniciarItensDoMenu();
    this.perfilUsuario = this.authService.getNivelAcessoId();
  }

  public iniciarItensDoMenu(): void {
    if (this.authService.isAdmin()) {
      this.botoesMenu = [
        {
          rota: 'administrador/dashboard',
          titulo: 'Dashboard',
          icone: 'bar_chart_4_bars',
        },
        {
          rota: 'atividade/criar',
          titulo: 'Criar Atividade',
          icone: 'add',
        },
        {
          rota: 'sistema/gerenciar',
          titulo: 'Gerenciar Sistemas',
          icone: 'add_to_queue',
        },
        {
          rota: 'administrador/gerenciar-usuarios',
          titulo: 'Gerenciar Usuários',
          icone: 'groups',
        },
        {
          rota: 'lideranca/squad/gerenciar',
          titulo: 'Gestão de Squads',
          icone: 'person',
        },
      ];
    }

    if (
      this.authService.isLiderDesenvolvimento() ||
      this.authService.isLiderNegocio()
    ) {
      this.botoesMenu = [
        {
          rota: 'lideranca/gerenciar-usuarios',
          titulo: 'Gestão de Usuários',
          icone: 'groups',
        },
      ];
    }

    if (this.authService.isAnalista() || this.authService.isDesenvolvedor()) {
      this.botoesMenu = [];
    }
  }
}

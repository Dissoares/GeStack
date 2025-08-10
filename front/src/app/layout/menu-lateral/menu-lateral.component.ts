import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NivelAcessoEnum, RotasEnum } from '../../core/enums';
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
  public nivelAcessoUsuario!: number;
  public botoesMenu: Array<BotaoMenu> = [];

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.iniciarItensDoMenu();
    this.nivelAcessoUsuario = this.authService.getNivelAcessoId();
  }

  public iniciarItensDoMenu(): void {
    if (this.authService.isAdmin()) {
      this.botoesMenu = [
        {
          rota: 'dashboard/administrador',
          titulo: 'Dashboard do Administrador',
          icone: 'dashboard',
        },
        {
          rota: 'dashboard/administrador-gestao-lideres',
          titulo: 'Gestão de Líderes',
          icone: 'supervisor_account',
        },
        {
          rota: 'dashboard/administrador-gestao-squads',
          titulo: 'Gestão de Squads',
          icone: 'groups',
        },
        {
          rota: 'dashboard/administrador-gestao-usuarios',
          titulo: 'Gestão de Usuários',
          icone: 'person',
        },
      ];
    }

    if (
      this.authService.isLiderDesenvolvimento() ||
      this.authService.isLiderNegocio()
    ) {
      this.botoesMenu = [];
    }

    if (this.authService.isAnalista() || this.authService.isDesenvolvedor()) {
      this.botoesMenu = [];
    }
  }
}

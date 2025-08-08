import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NivelAcessoEnum, RotasEnum } from '../../core/enums';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BotaoMenu } from '../../core/interfaces';
import { UsuarioService } from '../../services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private usuarioService: UsuarioService) {}

  public ngOnInit(): void {
    this.iniciarItensDoMenu();
    this.nivelAcessoUsuario = this.usuarioService.getNivelAcesso();
  }

  public iniciarItensDoMenu(): void {
    this.botoesMenu = [
      {
        rota:
          RotasEnum.ADMINISTRADOR.ROTA + '/' + RotasEnum.ADMINISTRADOR.LISTAGEM,
        titulo: 'Dashboard Administrativo',
        icone: 'admin_panel_settings',
        niveisPermitidos: [NivelAcessoEnum.ADMIN.id],
      },
      {
        rota: RotasEnum.LIDER.ROTA,
        titulo: 'Criar / Ver / Squads',
        icone: 'add_business',
        niveisPermitidos: [
          NivelAcessoEnum.LIDER_NEGOCIO.id,
          NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id,
        ],
      },
      {
        rota: RotasEnum.LIDER.ROTA + '/' + RotasEnum.LIDER.FORMULARIO,
        titulo: 'Adicionar Membros',
        icone: 'assignment_ind',
        niveisPermitidos: [
          NivelAcessoEnum.LIDER_NEGOCIO.id,
          NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id,
        ],
      },
      {
        rota: RotasEnum.LIDER.ROTA + '/' + RotasEnum.LIDER.LISTAGEM,
        titulo: 'Gerenciar Squads',
        icone: 'groups',
        niveisPermitidos: [
          NivelAcessoEnum.LIDER_NEGOCIO.id,
          NivelAcessoEnum.LIDER_DESENVOLVIMENTO.id,
        ],
      },
      {
        rota: RotasEnum.USUARIO.ROTA + '/' + RotasEnum.USUARIO.LISTAGEM,
        titulo: 'Visualizar Escalas',
        icone: 'analytics',
        niveisPermitidos: [
          NivelAcessoEnum.ANALISTA.id,
          NivelAcessoEnum.DESENVOLVEDOR.id,
        ],
      },
    ];
  }
}

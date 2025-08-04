import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RotaMenu } from '../../core/interfaces/rota-menu';
import { RotasEnum } from '../../core/enums/rotas.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
  public listaRotasMenu: Array<RotaMenu> = [];

  public ngOnInit(): void {
    this.iniciarItensDoMenu();
  }

  public iniciarItensDoMenu(): void {
    const index = RotasEnum.AUTH;

    this.listaRotasMenu = [
      {
        rota: `${index}/${RotasEnum}`,
        titulo: 'Cadastro',
      },
      {
        rota: `${index}/${RotasEnum}`,
        titulo: 'Cadastro',
      },
      {
        rota: `${index}/${RotasEnum}`,
        titulo: 'Cadastro',
      },
    ];
  }
}

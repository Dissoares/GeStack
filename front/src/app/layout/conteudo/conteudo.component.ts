import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RodapeComponent } from '../rodape/rodape.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [
    MenuLateralComponent,
    CabecalhoComponent,
    MatToolbarModule,
    MatSidenavModule,
    RodapeComponent,
    RouterModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public ehDispositivoMobile: boolean = false;

  constructor(private observer: BreakpointObserver) {}

  public ngOnInit() {
    this.verificarSeEhDispositivoMobile();
  }

  public ativarSidebar() {
    this.sidenav.toggle();
  }

  public verificarSeEhDispositivoMobile() {
    this.observer.observe([Breakpoints.Handset]).subscribe((resultado) => {
      this.ehDispositivoMobile = resultado.matches;
    });
  }
}

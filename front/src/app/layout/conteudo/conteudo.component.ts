import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RodapeComponent } from '../rodape/rodape.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subject, takeUntil } from 'rxjs';
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
    MatCardModule,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnInit {
  @ViewChild('sidenav') public barraLateral!: MatSidenav;
  
  public ehDispositivoMobile: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private observer: BreakpointObserver, private router: Router) {}

  public ngOnInit(): void {
    this.verificarSeEhDispositivoMobile();
    this.configurarNavegacao();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ativarSidebar(): void {
    this.barraLateral.toggle();
  }

  private verificarSeEhDispositivoMobile(): void {
    this.observer
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe((resultado) => {
        this.ehDispositivoMobile = resultado.matches;

        if (this.ehDispositivoMobile && this.barraLateral) {
          this.barraLateral.close();
        }
      });
  }

  private configurarNavegacao(): void {
    if (this.ehDispositivoMobile) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          if (this.barraLateral) {
            this.barraLateral.close();
          }
        });
    }
  }
}

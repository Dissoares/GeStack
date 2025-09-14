import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './services';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private loadingService = inject(LoadingService);
  private cdr = inject(ChangeDetectorRef);
  
  public carregando$ = this.loadingService.carregando$;

  public ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}

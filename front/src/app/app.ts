import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './services';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public carregando$: Observable<boolean>;
  private cdr = inject(ChangeDetectorRef);

  constructor(private loadingService: LoadingService) {
    this.carregando$ = this.loadingService.carregando$;
  }

  public ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}

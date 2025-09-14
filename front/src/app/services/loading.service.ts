import { asyncScheduler, BehaviorSubject, observeOn } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private timer: any;
  private carregando = new BehaviorSubject<boolean>(false);
  public carregando$ = this.carregando.asObservable();

  public mostrarSpinner(status: boolean) {
    if (status) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.carregando.next(true), 300);
    } else {
      clearTimeout(this.timer);
      this.carregando.next(false);
    }
  }
}

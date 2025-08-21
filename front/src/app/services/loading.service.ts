import { asyncScheduler, BehaviorSubject, observeOn } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private carregando = new BehaviorSubject<boolean>(false);

  private _carregando = new BehaviorSubject<boolean>(false);
  public carregando$ = this._carregando.asObservable().pipe(
    observeOn(asyncScheduler) 
  );

  public mostrarSpinner(opcao: boolean) {
    this.carregando.next(opcao);
  }
}

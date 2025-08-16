import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private carregando = new BehaviorSubject<boolean>(false);
  public carregando$ = this.carregando.asObservable();

  public mostrarSpinner(opcao: boolean) {
    const tempoExibicao = opcao === true ? 0 : 5000;

    setTimeout(() => this.carregando.next(opcao), tempoExibicao);
  }
}

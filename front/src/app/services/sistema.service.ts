import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sistema } from '../core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/sistema';

  constructor(private http: HttpClient) {}

  public cadastrar(sistema: Sistema): Observable<Sistema> {
    return this.http.post<Sistema>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      sistema
    );
  }

  public atualizar(sistema: Sistema): Observable<Sistema> {
    return this.http.put<Sistema>(
      `${this.apiUrl}${this.endPointUrl}/atualizar`,
      sistema
    );
  }

  public listarSistemas(): Observable<Array<Sistema>> {
    return this.http.get<Array<Sistema>>(
      `${this.apiUrl}${this.endPointUrl}/listarSistemas`
    );
  }

  public ativaDesativar(sistema: Sistema): Observable<Sistema> {
    const urlEndpoint = !sistema.ativo
      ? `${this.apiUrl}${this.endPointUrl}/desativar/${sistema.id}`
      : `${this.apiUrl}${this.endPointUrl}/ativar/${sistema.id}`;

    return this.http.put<Sistema>(urlEndpoint, {});
  }

  public excluir(id: number): Observable<Sistema> {
    return this.http.delete<Sistema>(`${this.apiUrl}${this.endPointUrl}/${id}`);
  }
}

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endPointUrl = '/usuario';

  public recarregarUsuarios$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public salvar(usuario: Usuario): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.apiUrl + this.endPointUrl, usuario, {
      observe: 'response',
    });
  }

  public atualizar(usuario: Usuario): Observable<string> {
    return this.http.put<string>(this.apiUrl + this.endPointUrl, usuario);
  }

  public excluir(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl + this.endPointUrl}/${id}`);
  }

  public listarUsuarios(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(this.apiUrl + this.endPointUrl);
  }

  public filtrarPor(filtro: Usuario): Observable<Array<Usuario>> {
    const params = new HttpParams({ fromObject: this.camposFiltrados(filtro) });
    return this.http.get<Array<Usuario>>(
      `${this.apiUrl}${this.endPointUrl}/filtrar`,
      { params }
    );
  }

  private camposFiltrados(filtros: any): { [param: string]: string } {
    const filtrados: { [campo: string]: string } = {};
    Object.keys(filtros).forEach((campo) => {
      if (filtros[campo] !== undefined && filtros[campo] !== null) {
        filtrados[campo] = filtros[campo].toString();
      }
    });
    return filtrados;
  }

  public buscarPor(nome: string): Observable<Array<Usuario>> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }

    return this.http.get<Array<Usuario>>(
      `${this.apiUrl}${this.endPointUrl}/por-nome`,
      { params }
    );
  }
}

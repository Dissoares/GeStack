import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endPointUrl = '/usuario';

  constructor(private http: HttpClient) {}

  public cadastro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      usuario
    );
  }

  public buscarPor(filtro: Usuario): Observable<Array<Usuario>> {
    const params = new HttpParams({ fromObject: this.camposFiltrados(filtro) });
    return this.http.get<Array<Usuario>>(
      `${this.apiUrl}${this.endPointUrl}/buscarTodos`,
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
}

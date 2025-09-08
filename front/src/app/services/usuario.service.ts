import { UsuarioToken } from '../core/interfaces/usuario-token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/usuario';

  constructor(private http: HttpClient) {}

  public cadastro(usuario: Usuario): Observable<Usuario> {
    usuario.criadoPor = { idUsuario: 1 } as Usuario;
    usuario.ativo = true;
    usuario.dataCriacao = new Date();
    return this.http.post<Usuario>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      usuario
    );
  }

  public buscarPor(filtro: Usuario): Observable<Array<Usuario>> {
    const params = new HttpParams({
      fromObject: this.toQueryParams(filtro),
    });
    return this.http.get<Array<Usuario>>(
      `${this.apiUrl}${this.endPointUrl}/buscarTodos`,
      { params }
    );
  }

  private toQueryParams(obj: any): { [param: string]: string } {
    const queryParams: { [key: string]: string } = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== null) {
        queryParams[key] = obj[key].toString();
      }
    });
    return queryParams;
  }
}

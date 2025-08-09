import { UsuarioToken } from '../core/interfaces/usuario-token';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    usuario.ativo = true;
    return this.http.post<Usuario>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      usuario
    );
  }
}

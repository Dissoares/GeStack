import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/models';
import { Observable } from 'rxjs';

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

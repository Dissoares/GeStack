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
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioToken | null>(null);
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/usuario';

  constructor(private http: HttpClient) {
    this.getUsuarioLogado();
  }

  public cadastro(usuario: Usuario): Observable<Usuario> {
    usuario.ativo = true;
    return this.http.post<Usuario>(
      `${this.apiUrl}${this.endPointUrl}/cadastrar`,
      usuario
    );
  }

  public getUsuarioLogado(): UsuarioToken | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const usuarioLogado = jwtDecode<UsuarioToken>(token);
      this.usuarioLogadoSubject.next(usuarioLogado);
      return usuarioLogado;
    } catch {
      return null;
    }
  }

  public getNivelAcesso(): number {
    const usuario = this.getUsuarioLogado();
    return usuario?.nivelAcesso || 0;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.usuarioLogadoSubject.next(null);
  }
}

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private endPointUrl = '/auth';

  constructor(private http: HttpClient) {}

  public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}${this.endPointUrl}/login`,usuario);
  }

  public cadastro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}${this.endPointUrl}/cadastrar`,usuario);
  }

  public getNivelAcesso(): number {
    return 0;
  }

  public getTokenAcesso(): string {
    return '';
  }

  public logout(): void {}
}

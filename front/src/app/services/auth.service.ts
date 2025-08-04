import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from '../core/models';

interface LoginResponse {
  token: string;
  nivel: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private nivelKey = 'nivel';

  constructor(private http: HttpClient) {}

  public login(usuario: Usuario): Observable<void> {
    return this.http.post<LoginResponse>('/api/auth/login', { usuario }).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.nivelKey, res.nivel.toString());
      }),
      map(() => {})
    );
  }

  public cadastro(usuario: Usuario): Observable<void> {
    return this.http.post<void>('/api/auth/register', { usuario });
  }

  public getNivelAcesso(): number {
    return parseInt(localStorage.getItem(this.nivelKey) || '0', 10);
  }

  public getTokenAcesso(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public logout(): void {
    localStorage.clear();
  }
}

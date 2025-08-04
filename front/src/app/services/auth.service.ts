import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

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

  public login(username: string, password: string): Observable<void> {
    return this.http
      .post<LoginResponse>('/api/auth/login', { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.nivelKey, res.nivel.toString());
        }),
        map(() => {})
      );
  }

  public cadastro(
    nome: string,
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    return this.http.post<void>('/api/auth/register', {
      nome,
      email,
      username,
      password,
    });
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

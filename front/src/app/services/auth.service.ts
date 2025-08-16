import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UsuarioToken } from '../core/interfaces/usuario-token';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NivelAcessoEnum } from '../core/enums';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../core/dtos';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly LOCAL_STORAGE = { TOKEN: 'token' } as const;
  private readonly API_ENDPOINT = { AUTH: 'auth' } as const;
  private readonly usuarioLogado = new BehaviorSubject<UsuarioToken | null>(null);
  private readonly nivelAcesso = new BehaviorSubject<NivelAcessoEnum | null>(null);
  public token$ = new BehaviorSubject<string | null>(localStorage.getItem(this.LOCAL_STORAGE.TOKEN));

  public readonly usuarioLogado$ = this.usuarioLogado.asObservable();
  public readonly nivelAcesso$ = this.nivelAcesso.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.carregarTokenDoStorage();
  }

  public login(loginDto: LoginDto): Observable<{ token: string }> {
    const url = `${this.apiUrl}/${this.API_ENDPOINT.AUTH}/login`;

    return this.http.post<{ token: string }>(url, loginDto).pipe(
      tap(({ token }) => this.processarToken(token)),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      })
    );
  }

  private carregarTokenDoStorage(): void {
    const token = localStorage.getItem(this.LOCAL_STORAGE.TOKEN);
    if (!token) {
      this.removerAcesso();
      return;
    }
    try {
      if (this.isTokenExpirado(token)) {
        console.warn('Token expirado. Fazendo logout.');
        this.removerAcesso();
        return;
      }
      const usuario = this.decodificarToken(token);
      this.setUsuarioLogado(usuario);
    } catch (error) {
      this.removerAcesso();
    }
  }

  private processarToken(token: string): void {
    try {
      if (this.isTokenExpirado(token)) {
        console.warn('Token recebido já está expirado.');
        throw new Error('Token expirado');
      }
      localStorage.setItem(this.LOCAL_STORAGE.TOKEN, token);
      const usuario = this.decodificarToken(token);
      this.setUsuarioLogado(usuario);
    } catch (error) {
      console.error('Erro ao processar token:', error);
      throw error;
    }
  }

  public isTokenExpirado(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;
      const expMs = decoded.exp * 1000;
      return Date.now() > expMs;
    } catch (e) {
      return true;
    }
  }

  private decodificarToken(token: string): UsuarioToken {
    return jwtDecode<UsuarioToken>(token);
  }

  private setUsuarioLogado(usuario: UsuarioToken): void {
    this.usuarioLogado.next(usuario);
    const nivelAcesso = NivelAcessoEnum.getById(usuario.nivelAcesso);
    this.nivelAcesso.next(nivelAcesso ?? null);
  }

  public removerAcesso(): void {
    localStorage.removeItem(this.LOCAL_STORAGE.TOKEN);
    this.usuarioLogado.next(null);
    this.nivelAcesso.next(null);
  }

  public getNivelAcessoId(): number {
    return this.nivelAcesso.value?.id ?? 0;
  }

  private temAcesso(...niveis: Array<NivelAcessoEnum>): boolean {
    return niveis.some((nivel) => nivel.id === this.getNivelAcessoId());
  }

  public isAdmin(): boolean {
    return this.temAcesso(NivelAcessoEnum.ADMIN);
  }

  public isLiderDesenvolvimento(): boolean {
    return this.temAcesso(NivelAcessoEnum.LIDER_DESENVOLVIMENTO);
  }

  public isLiderNegocio(): boolean {
    return this.temAcesso(NivelAcessoEnum.LIDER_NEGOCIO);
  }

  public isDesenvolvedor(): boolean {
    return this.temAcesso(NivelAcessoEnum.DESENVOLVEDOR);
  }

  public isAnalista(): boolean {
    return this.temAcesso(NivelAcessoEnum.ANALISTA);
  }

  public isGeralLider(): boolean {
    return this.temAcesso(
      NivelAcessoEnum.LIDER_DESENVOLVIMENTO,
      NivelAcessoEnum.LIDER_NEGOCIO
    );
  }

  public isGeralMembro(): boolean {
    return this.temAcesso(
      NivelAcessoEnum.DESENVOLVEDOR,
      NivelAcessoEnum.ANALISTA
    );
  }

  public podeGerenciarSquads(): boolean {
    return this.isAdmin() || this.isGeralLider();
  }

  public podeAcessarAreaAdmin(): boolean {
    return this.isAdmin();
  }

  public podeAcessarAreaLider(): boolean {
    return this.isGeralLider();
  }

  public podeAcessarAreaUsuario(): boolean {
    return this.isAdmin() || this.isGeralLider() || this.isGeralMembro();
  }

  public logout(): void {
    this.removerAcesso();
    this.router.navigate([this.API_ENDPOINT.AUTH]);
  }
}

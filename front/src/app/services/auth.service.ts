import { UsuarioToken } from '../core/interfaces/usuario-token';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NivelAcessoEnum } from '../core/enums';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../core/dtos';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly endPointUrl = '/auth';
  private readonly TOKEN_KEY = 'token';

  private usuarioLogado = new BehaviorSubject<UsuarioToken | null>(null);
  private nivelAcesso = new BehaviorSubject<NivelAcessoEnum | null>(null);

  public readonly usuarioLogado$ = this.usuarioLogado.asObservable();
  public readonly nivelAcesso$ = this.nivelAcesso.asObservable();

  constructor(private http: HttpClient,private router: Router) {
    this.carregarTokenDoStorage();
  }

  public login(loginDto: LoginDto): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${this.apiUrl}${this.endPointUrl}/login`,
        loginDto
      )
      .pipe(
        tap(({ token }) => {
          this.setUsuarioNoStorage(token);
        })
      );
  }

  private carregarTokenDoStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      this.removerAcesso();
      return;
    }
    try {
      const usuario = jwtDecode<UsuarioToken>(token);
      this.setUsuarioLogado(usuario);
    } catch {
      this.removerAcesso();
    }
  }

  private setUsuarioNoStorage(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    const usuario = jwtDecode<UsuarioToken>(token);
    this.setUsuarioLogado(usuario);
  }

  private setUsuarioLogado(usuario: UsuarioToken): void {
    this.usuarioLogado.next(usuario);
    this.nivelAcesso.next(NivelAcessoEnum.getById(usuario.nivelAcesso) ?? null);
  }

  public removerAcesso(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.usuarioLogado.next(null);
    this.nivelAcesso.next(null);
    this.router.navigate(['/login']);
  }

  public getNivelAcessoId(): number {
    return this.nivelAcesso.value?.id ?? 0;
  }

  private acessoNivel(...niveis: Array<NivelAcessoEnum>): boolean {
    return niveis.some((n) => n.id === this.getNivelAcessoId());
  }

  public isAdmin(): boolean {
    return this.acessoNivel(NivelAcessoEnum.ADMIN);
  }

  public isLiderDesenvolvimento(): boolean {
    return this.acessoNivel(NivelAcessoEnum.LIDER_DESENVOLVIMENTO);
  }

  public isLiderNegocio(): boolean {
    return this.acessoNivel(NivelAcessoEnum.LIDER_NEGOCIO);
  }

  public isDesenvolvedor(): boolean {
    return this.acessoNivel(NivelAcessoEnum.DESENVOLVEDOR);
  }

  public isAnalista(): boolean {
    return this.acessoNivel(NivelAcessoEnum.ANALISTA);
  }

  public isGeralLider(): boolean {
    return this.acessoNivel(
      NivelAcessoEnum.LIDER_DESENVOLVIMENTO,
      NivelAcessoEnum.LIDER_NEGOCIO
    );
  }

  public isGeralMembro(): boolean {
    return this.acessoNivel(
      NivelAcessoEnum.DESENVOLVEDOR,
      NivelAcessoEnum.ANALISTA
    );
  }

  public podeGerenciarSquads(): boolean {
    return this.acessoNivel(NivelAcessoEnum.ADMIN) || this.isGeralLider();
  }

  public podeAcessarAreaAdmin(): boolean {
    return this.isAdmin();
  }

  public podeAcessarAreaLider(): boolean {
    return this.isAdmin() || this.isGeralLider();
  }

  public podeAcessarAreaUsuario(): boolean {
    return this.isAdmin() || this.isGeralLider() || this.isGeralMembro();
  }
}

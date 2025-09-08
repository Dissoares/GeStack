import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const permissoesAcesso = route.data['permissoes'] as Array<number>;
    const rotaLogin = route.routeConfig?.path === 'auth';

    const token = localStorage.getItem('token');
    if (token && this.authService.isTokenExpirado(token)) {
      console.warn('Token expirado detectado pelo AuthGuard.');
      this.authService.logout();
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.authService.usuarioLogado$.pipe(
      take(1),
      map((usuario) => {
        if (rotaLogin && usuario) {
          this.redirecionarComBaseNoPerfil();
          return false;
        }

        if (!usuario && permissoesAcesso) {
          this.authService.logout();
          return false;
        }

        if (usuario && permissoesAcesso) {
          if (permissoesAcesso.includes(usuario.perfil)) {
            return true;
          }
          this.redirecionarComBaseNoPerfil();
          return false;
        }
        return true;
      })
    );
  }

  private redirecionarComBaseNoPerfil(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/administrador/dashboard']);
    } else if (this.authService.isGeralLider()) {
      this.router.navigate(['/lideranca/dashboard']);
    } else if (this.authService.isGeralMembro()) {
      this.router.navigate(['/membro/dashboard']);
    } else {
      this.authService.logout();
    }
  }
}

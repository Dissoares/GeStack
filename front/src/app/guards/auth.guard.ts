import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);

  constructor() {}

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
          this.authService.redirecionarComBaseNoPerfil();
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
          this.authService.redirecionarComBaseNoPerfil();
          return false;
        }
        return true;
      })
    );
  }
}

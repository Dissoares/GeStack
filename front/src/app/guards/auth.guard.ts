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

    return this.authService.usuarioLogado$.pipe(
      take(1),
      map((usuario) => {
        if (rotaLogin && usuario) {
          this.redirecionarBaseadoNoNivelAcesso();
          return false;
        }

        if (!usuario && !permissoesAcesso) {
          this.authService.removerAcesso();
          this.router.navigate(['/dashboard']);
          return false;
        }

        if (usuario && permissoesAcesso) {
          if (permissoesAcesso.includes(usuario.nivelAcesso)) {
            return true;
          }
          this.redirecionarBaseadoNoNivelAcesso();
          return false;
        }
        return true;
      })
    );
  }

  private redirecionarBaseadoNoNivelAcesso(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/dashboard/administrador-listagem']);
    } else if (this.authService.isGeralLider()) {
      this.router.navigate(['/dashboard/lideranca-listagem']);
    } else if (this.authService.isGeralMembro()) {
      this.router.navigate(['/dashboard/membro-listagem']);
    } else {
      this.authService.logout();
    }
  }
}

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
           console.log("rotaLogin && usuario", rotaLogin)
          this.redirecionarBaseadoNoNivelAcesso();
          return false;
        }

        if (!usuario && permissoesAcesso) {
           console.log("permissoesAcesso", rotaLogin)
          this.authService.logout();
          return false;
        }

        if (usuario && permissoesAcesso) {
           console.log("usuario e permissoesAcesso", rotaLogin)
          if (permissoesAcesso.includes(usuario.nivelAcesso)) {
            return true;
          }
          this.redirecionarBaseadoNoNivelAcesso();
          return false;
        }
         console.log("eslse", rotaLogin)
        return true;
      })
    );
  }

  private redirecionarBaseadoNoNivelAcesso(): void {
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

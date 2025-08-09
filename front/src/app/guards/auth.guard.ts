import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const permissoesAcesso = route.data['permissao'] as Array<number>;

    return this.authService.usuarioLogado$.pipe(
      take(1),
      map((usuario) => {
        if (!usuario) {
          this.authService.removerAcesso();
          this.router.navigate(['/auth']);
          return false;
        }

        if (permissoesAcesso.includes(usuario.nivelAcesso)) {
          return true;
        }

        return false;
      })
    );
  }
}

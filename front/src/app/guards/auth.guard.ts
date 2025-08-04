import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const nivelNecessario = route.data['nivel'] as number;
    const nivelUsuario = this.auth.getNivelAcesso();
    if (nivelUsuario === nivelNecessario) return true;

    this.router.navigate(['/login']);
    return false;
  }
}

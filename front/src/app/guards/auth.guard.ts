import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService, UsuarioService } from '../services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const nivelNecessario = route.data['nivel'] as number;
    const nivelUsuario = this.usuarioService.getNivelAcesso();
    if (nivelUsuario === nivelNecessario) return true;

    this.router.navigate(['/login']);
    return false;
  }
}

import { CanActivate } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public canActivate(): Observable<boolean> {
    return this.authService.usuarioLogado$.pipe(
      take(1),
      map((usuario) => {
        if (usuario) return true;

        this.authService.removerAcesso();
        return false;
      })
    );
  }
}

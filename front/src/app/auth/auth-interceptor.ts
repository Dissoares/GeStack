import { AuthService, LoadingService } from '../services';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (requisicao, next) => {
  const loadingService = inject(LoadingService);
  const authService = inject(AuthService);

  loadingService.mostrarSpinner(true);

  const tokenAcesso = authService.token$.value;

  if (tokenAcesso) {
    requisicao = requisicao.clone({
      setHeaders: { Authorization: `Bearer ${tokenAcesso}` },
    });
  }

  return next(requisicao).pipe(
    finalize(() => loadingService.mostrarSpinner(false))
  );
};

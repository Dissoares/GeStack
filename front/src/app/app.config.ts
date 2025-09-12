import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
  ApplicationConfig,
} from '@angular/core';
import {
  withEnabledBlockingInitialNavigation,
  withRouterConfig,
  provideRouter,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { authInterceptorFn } from './auth/auth-interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 1500,
      closeButton: true,
      progressBar: true,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
  ],
};

import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
  ApplicationConfig,
} from '@angular/core';
import {
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideRouter, withRouterConfig } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
  ],
};

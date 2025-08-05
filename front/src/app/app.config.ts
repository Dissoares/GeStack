import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  ApplicationConfig,
} from '@angular/core';
import {
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  provideHttpClient,
} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};

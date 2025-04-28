import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync('noop'), 
    provideHttpClient(withInterceptors([LoadingInterceptor])),
  ],
};
export function configPrimeNG(primengConfig: PrimeNGConfig) {
  primengConfig.ripple = true; // Enables ripple effect (optional)
}

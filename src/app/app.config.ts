import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync('noop')]
};
export function configPrimeNG(primengConfig: PrimeNGConfig) {
  primengConfig.ripple = true; // Enables ripple effect (optional)
}

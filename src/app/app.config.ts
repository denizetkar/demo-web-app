import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(MatIconModule),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const domSanitizer = inject(DomSanitizer);
      iconRegistry.addSvgIcon(
        'mdiFilter',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/filter.svg'),
      );
    }),
  ],
};

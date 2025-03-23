import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { countReducer } from './store/task.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { BidiModule } from '@angular/cdk/bidi';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    importProvidersFrom(MatDialogModule, BidiModule),
    provideStore({ tasks: countReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: true })
  ]
};

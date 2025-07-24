import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { countReducer } from './store/task.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { BidiModule } from '@angular/cdk/bidi';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    importProvidersFrom(MatDialogModule, BidiModule, SharedModule),
    provideStore({ tasks: countReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: true })
  ]
};

import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
//import { provideAnimations } from '@angular/platform-browser/animations';

// import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        //provideRouter(routes),
        //provideAnimations()
    ]
};

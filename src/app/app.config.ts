import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { studentRoutes } from './features/student/student.routes';
import { teacherRoutes } from './features/teacher/teacher.routes';

// Importaciones necesarias
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loader-interceptor.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes, withViewTransitions()),
    
    
    // provideClientHydration(withEventReplay()), 

    // Configuración HTTP: Aquí se combinan los interceptores
    provideHttpClient(withInterceptors([
      loadingInterceptor, 
      authInterceptor     
    ]))
  ]
};
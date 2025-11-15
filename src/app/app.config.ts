import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { studentRoutes } from './features/student/student.routes';
import { teacherRoutes } from './features/teacher/teacher.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideRouter(studentRoutes),provideRouter(teacherRoutes),provideClientHydration(withEventReplay())]
};


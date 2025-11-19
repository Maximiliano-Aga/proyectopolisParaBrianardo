import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { EnrollSubjectsComponent } from './pages/enroll-subjects/enroll-subjects.component';

export const studentRoutes: Routes = [
  { path: 'enroll', component: EnrollSubjectsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'attendance-history', component: AttendanceHistoryComponent },
      { path: 'subjects', component: SubjectsComponent },

      // Redirección dentro del dashboard (ruta hija)
      { path: '', redirectTo: 'attendance-history', pathMatch: 'full' },
      { path: '**', redirectTo: 'attendance-history', pathMatch: 'full' }
    ]
  },

  // Redirecciones fuera del dashboard
  { path: '', redirectTo: '/private/student/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/private/student/dashboard', pathMatch: 'full' }
];

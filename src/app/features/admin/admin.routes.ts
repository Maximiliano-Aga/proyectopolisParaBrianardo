import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { JustifyAbsenceComponent } from './justify-absence/justify-absence.component';
import { AbsenceReportsComponent } from './reports/absence-reports/absence-reports.component';
import { GenerateReportComponent } from './reports/generate-report/generate-report.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RouterProvisionalComponent } from './router-provisional/router-provisional.component';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'attendance-overview', component: AttendanceOverviewComponent },
      { path: 'edit-attendance', component: EditAttendanceComponent },
      { path: 'justify-absence', component: JustifyAbsenceComponent },
      { path: 'reports/absence-reports', component: AbsenceReportsComponent },
      { path: 'reports/generate-reports', component: GenerateReportComponent },
      { path: 'take-attendance', component: TakeAttendanceComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'subject-management', component: SubjectManagementComponent },
      { path: 'role-management', component: RoleManagementComponent },

      { path: '', redirectTo: 'user-management', pathMatch: 'full' }, // Ruta por defecto dentro del dashboard
      { path: '**', redirectTo: 'user-management', pathMatch: 'full' }
    ]
  },

  { path: 'router-provisional', component: RouterProvisionalComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { JustifyAbsenceComponent } from './justify-absence/justify-absence.component';
import { AbsenceReportsComponent } from './reports/absence-reports/absence-reports.component';
import { GenerateReportComponent } from './reports/generate-report/generate-report.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const adminRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path:'attendance-overview',component: AttendanceOverviewComponent},
    {path:'edit-attendance',component: EditAttendanceComponent},
    {path: 'justify-absence',component: JustifyAbsenceComponent},
    {path: 'reports/absence-reports',component: AbsenceReportsComponent},
    {path: 'reports/generate-reports',component: GenerateReportComponent},
    {path: 'take-attendance',component:TakeAttendanceComponent},
    {path: 'user-managment', component: UserManagementComponent},
    {path: '', redirectTo: '/private/admin/dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: '/private/admin/dashboard', pathMatch: 'full'}
];



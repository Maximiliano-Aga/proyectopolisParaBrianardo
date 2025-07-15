import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { SubjectsComponent } from './subjects/subjects.component';

export const studentRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path:'attendance-history',component: AttendanceHistoryComponent},
    {path:'subjects',component: SubjectsComponent},
];

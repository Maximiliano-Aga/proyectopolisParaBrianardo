import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

export const teacherRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'attendance-list', component: AttendanceListComponent },
      { path: 'edit-attendance', component: EditAttendanceComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'take-attendance', component: TakeAttendanceComponent },

      { path: '', redirectTo: 'attendance-list', pathMatch: 'full' }, // redirige a algo lógico
      { path: '**', redirectTo: 'attendance-list', pathMatch: 'full' }
    ]
  }
];

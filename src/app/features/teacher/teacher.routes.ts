import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

export const teacherRoutes: Routes = [
    {path: 'teacher/dashboard', component: DashboardComponent},
    {path:'teacher/attendance-list',component: AttendanceListComponent},
    {path:'teacher/edit-attendance',component: EditAttendanceComponent},
    {path:'teacher/subjects',component: SubjectsComponent},
    {path:'teacher/take-attendance', component: TakeAttendanceComponent} // Assuming this is the same component for editing attendance
];

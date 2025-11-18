import { Routes } from '@angular/router';
import { PublicLayoutsComponent } from './core/layouts/public-layouts/public-layouts.component';
import { PrivateLayoutsComponent } from './core/layouts/private-layouts/private-layouts.component';
import { CarreraListComponent } from './features/carreras/pages/carrera-list/carrera-list.component';

export const routes: Routes = [
    {path: 'public', 
        component: PublicLayoutsComponent,
        children: [
            {path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)},
            {path: '', redirectTo: '/public/auth/login', pathMatch: 'full'},
            {path: '**', redirectTo: '/public/auth/login', pathMatch: 'full'},

        ]
    },

    {path:'private',
        component: PrivateLayoutsComponent,
        children: [
            {path: 'admin', loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)},
            {path: 'student', loadChildren: () => import('./features/student/student.routes').then(m => m.studentRoutes)},
            {path:'teacher', loadChildren: () => import('./features/teacher/teacher.routes').then(m => m.teacherRoutes)},
            {path: 'carreras', component: CarreraListComponent},
        ]
    },

    {path: '', redirectTo: '/public/auth/login', pathMatch: 'full'},
];



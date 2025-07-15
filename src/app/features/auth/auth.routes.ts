import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PasswordRecoveryComponent } from "./password-recovery/password-recovery.component";
export const authRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path:'password-recovery', component: PasswordRecoveryComponent},
    {path: '', redirectTo: '/public/auth/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/public/auth/login', pathMatch: 'full'}
]
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      usMail: ['', [Validators.required, Validators.email]],
      usPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginError = null;

    
    const credentials = {
      usMail: this.loginForm.get('usMail')?.value,
      usPassword: this.loginForm.get('usPassword')?.value
    };


    this.authService.login(credentials).subscribe({
      next: () => {
        this.redirectUserByRole();
      },
      error: (err) => {
        console.error('Error en el login:', err);
  
        if (err.status === 422) {
          this.loginError = 'Los datos proporcionados no son válidos.';
        } else {
          this.loginError = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }

  private redirectUserByRole(): void {
    const role = this.authService.getUserRole();

    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (role === 'estudiante') {
      this.router.navigate(['/student/dashboard']);
    } else if (role === 'profesor') {
      this.router.navigate(['/teacher/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
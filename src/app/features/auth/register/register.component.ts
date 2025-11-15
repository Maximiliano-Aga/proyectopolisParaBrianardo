import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
private fb = inject(FormBuilder);
private router = inject(Router);
registrosForm: FormGroup;

constructor() {  
this.registrosForm = this.fb.group({
 usMail: ['',[Validators.required, Validators.email]],
    usPassword: ['',[Validators.required, Validators.minLength(8)]],
    rol: ['', [Validators.required]],
    usDocumento: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8)]],
    usApellido: ['', Validators.required],
    usNombre: ['', Validators.required],
    usTelefono: ['', Validators.required],
    usDomicilio: ['', Validators.required],
    usLocalidad: ['', Validators.required],
}, { validators: this.passwordMatchValidator });
}

 private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('usPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}

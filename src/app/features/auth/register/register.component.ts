import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LocalidadesServiceService } from '../../../core/services/localidades/localidades-service.service';

@Component({
  selector: 'app-register',
  imports:  [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
private fb = inject(FormBuilder);
private localidadesService = inject(LocalidadesServiceService);
registrosForm: FormGroup;

ngOnInit() {
  this.obtenerProvincias();
}

constructor() {  
this.registrosForm = this.fb.group({
 usMail: ['',[Validators.required, Validators.email]],
    usPassword: ['',[Validators.required, Validators.minLength(8)]],
    repetirPassword: ['',[Validators.required, Validators.minLength(8)]],
    rol: ['', [Validators.required]],
    usDocumento: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(8)]],
    usApellido: ['', Validators.required],
    usNombre: ['', Validators.required],
    usTelefono: ['', Validators.required],
    usDomicilio: ['', Validators.required],
    usLocalidad: ['0', Validators.required],
    usProvincia: ['0', Validators.required],
}, { validators: this.passwordMatchValidator });
}

 private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('usPassword');
    const confirmPassword = control.get('repetirPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { repetirPassword: true };
  };

  get usMail() {
    return this.registrosForm.controls['usMail'];
  }
  get usDocumento() {
    return this.registrosForm.controls['usDocumento'];
  }
  get usProvincia() {
    return this.registrosForm.controls['usProvincia'];
  }
  get usApellido() {
    return this.registrosForm.controls['usApellido'];
  }
  get usNombre() {
    return this.registrosForm.controls['usNombre'];
  }
  get usLocalidad() {
    return this.registrosForm.controls['usLocalidad'];
  }
  get usDomicilio() {
    return this.registrosForm.controls['usDomicilio'];
  }
  get rol() {
    return this.registrosForm.controls['rol'];
  }
  get usTelefono() {
    return this.registrosForm.controls['usTelefono'];
  }
  get usPassword() {
    return this.registrosForm.controls['usPassword'];
  }
  get repetirPassword() {
    return this.registrosForm.controls['repetirPassword'];
  }

  registrarUsuario() {
    if (this.registrosForm.valid) {
      console.log("Formulario de registro válido", this.registrosForm.value);
    } else {
      console.log("Formulario de registro inválido");
      this.registrosForm.markAllAsTouched();
    }
  }
  
  provincias: any[] = [];
  obtenerProvincias() {
    this.localidadesService.obtenerProvincias().subscribe({
      next: (response) => {
        this.provincias = response.provincias;
        console.log(this.provincias);
      }
    })
  }

  localidades: any[]=[];
  obtenerLocalidades() {
    const provinciaId = this.usProvincia.value;
    this.localidadesService.obtenerLocalidades(provinciaId).subscribe({
      next: (response) => {
        this.localidades = response.localidades;
        console.log(this.localidades);
      }
    })
  }

}

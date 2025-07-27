import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  document.addEventListener('DOMContentLoaded', function() {
        // Manejar el login
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Validación simple
            if(!username || !password) {
                alert('Por favor complete todos los campos');
                return;
            }
            
            // Aquí iría la lógica de autenticación real
            console.log('Intento de login con:', { username, password });
            alert('Autenticación exitosa (simulada)');
            
            // Redirección simulada
            // window.location.href = '/dashboard';
        });
        
        // Manejar el registro
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar contraseñas
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if(password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if(password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            // Recoger todos los datos
            const userData = {
                documento: document.getElementById('documento').value,
                apellido: document.getElementById('apellido').value,
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                domicilio: document.getElementById('domicilio').value,
                localidad: document.getElementById('localidad').value,
                rol: document.getElementById('rol').value,
                password: password
            };
            
            // Aquí iría la lógica para enviar los datos al servidor
            console.log('Datos de registro:', userData);
            
            // Simulación de registro exitoso
            alert('Registro exitoso. Por favor inicie sesión con sus nuevas credenciales.');
            
            // Cerrar el modal y limpiar el formulario
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            modal.hide();
            document.getElementById('registerForm').reset();
        });
    });
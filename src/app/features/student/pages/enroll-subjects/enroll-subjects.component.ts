import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Carrera } from '../../../../features/carreras/models/carrera.model'; // Ajusta la ruta si es necesario
import { Materia } from '../../../../features/carreras/models/materia.model'; // Ajusta la ruta si es necesario
import { CarreraService } from '../../../../features/carreras/services/carrera.service'; // Ajusta la ruta si es necesario
import { InscripcionService } from '../../services/inscripcion.service';
import { AuthServiceService } from '../../../../core/services/auth/auth-service.service';

@Component({
  selector: 'app-enroll-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enroll-subjects.component.html',
  styleUrls: ['./enroll-subjects.component.css']
})
export class EnrollSubjectsComponent implements OnInit {

  public carreras$!: Observable<Carrera[]>;
  public currentUserId!: number;

  public inscripcionEnProceso: boolean = false; // Para evitar múltiples envíos

  constructor(
    private carreraService: CarreraService,
    private inscripcionService: InscripcionService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.carreras$ = this.carreraService.getCarrerasConMaterias();
    const user = this.authService.getUser();
    if (user) {
      this.currentUserId = user.id;
    }
  }

  inscribir(materiaId: number, materiaNombre: string): void {
    if (this.inscripcionEnProceso) {
      console.warn('Ya hay una inscripción en proceso.');
      return;
    }

    // Aquí se debería obtener el ID de usuario real del servicio de autenticación
    if (!this.currentUserId) {
      console.error('ID de usuario no disponible. No se puede realizar la inscripción.');
      // Opcional: mostrar un mensaje al usuario
      return;
    }

    this.inscripcionEnProceso = true;
    console.log(`Solicitando inscripción a ${materiaNombre} (ID: ${materiaId}) para usuario ${this.currentUserId}`);

    this.inscripcionService.solicitarInscripcion(materiaId, this.currentUserId).subscribe({
      next: (response) => {
        console.log('Inscripción solicitada con éxito:', response);
        alert(`Solicitud de inscripción a "${materiaNombre}" enviada con éxito. Estado: Pendiente.`);
        // Aquí podrías actualizar el UI para deshabilitar el botón o mostrar un estado
        this.inscripcionEnProceso = false;
      },
      error: (error) => {
        console.error('Error al solicitar inscripción:', error);
        alert(`Error al solicitar inscripción a "${materiaNombre}". ${error.error?.detalle || error.message}`);
        this.inscripcionEnProceso = false;
      }
    });
  }
}

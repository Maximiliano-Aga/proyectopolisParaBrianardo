import { Component } from '@angular/core';
import { AsistenciasServiceService } from '../../../core/services/Asistencias/asistencias-service.service';
import { InscripcionInterfaz } from '../../../core/interfaces/inscripciones/inscripcion-interfaz';
import { inject } from '@angular/core';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  private asistenciasService = inject(AsistenciasServiceService);
  inscripcionesPendientes: InscripcionInterfaz[] = [];

  ngOnInit() {
    this.obtenerInscripcionesPendientes();
  }

  obtenerInscripcionesPendientes() {
  this.asistenciasService.inscripcionesPendientes().subscribe({
    next: (response) => {
      this.inscripcionesPendientes = response.map((inscripcion: any) => ({
        ...inscripcion,
        created_at: inscripcion.created_at.split("T")[0]
      }));
    },
    error: (error) => {
      console.log("Error al buscar inscripciones", error)
    }
  });
}


  aprobarInscripcion(inscripcion: InscripcionInterfaz) {
    inscripcion.estadoInscrip = "aprobada";
    this.asistenciasService.actualizarInscripcion(inscripcion).subscribe({
      next: (response) => {
        console.log("Inscripción aprobada", response);
        this.obtenerInscripcionesPendientes();
      },
      error: (error) => {
        console.log("Error al aprobar inscripción")
      }
    })
  }

  rechazarInscripcion(inscripcion: InscripcionInterfaz) {
    inscripcion.estadoInscrip = "rechazada";
    this.asistenciasService.actualizarInscripcion(inscripcion).subscribe({
      next: (response) => {
        console.log("Inscripción rechazada", response);
        this.obtenerInscripcionesPendientes();
      },
      error: (error) => {
        console.log("Error al rechazar inscripción", error)
      }
    })
  }

}

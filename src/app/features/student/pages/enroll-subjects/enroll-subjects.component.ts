import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs'; // Importar forkJoin
import { map } from 'rxjs/operators'; // Importar map
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
  public userInscriptions: any[] = []; // Para almacenar las inscripciones del usuario

  public inscripcionEnProceso: boolean = false; // Para evitar múltiples envíos

  constructor(
    private carreraService: CarreraService,
    private inscripcionService: InscripcionService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.currentUserId = user.id;

      forkJoin([
        this.carreraService.getCarrerasConMaterias(),
        this.inscripcionService.getInscripciones(this.currentUserId)
      ]).pipe(
        map(([carreras, userInscriptions]) => {
          this.userInscriptions = userInscriptions;
          return carreras.map(carrera => {
            carrera.materias = carrera.materias?.map(materia => {
              const inscripcion = this.userInscriptions.find(
                (ins: any) => ins.idMateria === materia.id && ins.idUsuario === this.currentUserId
              );
              return {
                ...materia,
                inscripcionStatus: inscripcion ? inscripcion.estadoInscrip : 'no_inscrito'
              };
            });
            return carrera;
          });
        })
      ).subscribe(carrerasConEstados => {
        this.carreras$ = new Observable(observer => {
          observer.next(carrerasConEstados);
          observer.complete();
        });
      });
    }
  }

  inscribir(materiaId: number, materiaNombre: string): void {
    if (this.inscripcionEnProceso) {
      console.warn('Ya hay una inscripción en proceso.');
      return;
    }

    if (!this.currentUserId) {
      console.error('ID de usuario no disponible. No se puede realizar la inscripción.');
      return;
    }

    this.inscripcionEnProceso = true;
    console.log(`Solicitando inscripción a ${materiaNombre} (ID: ${materiaId}) para usuario ${this.currentUserId}`);

    this.inscripcionService.solicitarInscripcion(materiaId, this.currentUserId).subscribe({
      next: (response) => {
        console.log('Inscripción solicitada con éxito:', response);
        alert(`Solicitud de inscripción a "${materiaNombre}" enviada con éxito. Estado: Pendiente.`);
        this.inscripcionEnProceso = false;
        // Opcional: Recargar los datos o actualizar el estado de la materia específica
        this.ngOnInit(); // Recargar todos los datos para reflejar el cambio
      },
      error: (error) => {
        console.error('Error al solicitar inscripción:', error);
        alert(`Error al solicitar inscripción a "${materiaNombre}". ${error.error?.detalle || error.message}`);
        this.inscripcionEnProceso = false;
      }
    });
  }
}

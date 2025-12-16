import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { CarrerasInterfaz } from '../../../core/interfaces/carreras/carreras-interfaz';
import { MateriaInterfaz } from '../../../core/interfaces/Materias/materia-interfaz';
import { InscripcionInterfaz } from '../../../core/interfaces/inscripciones/inscripcion-interfaz';
import { AsistenciaInterfaz } from '../../../core/interfaces/asistencias/asistencia-interfaz';

import { MateriasServiceService } from '../../../core/services/materias/materias-service.service';
import { AsistenciasServiceService } from '../../../core/services/Asistencias/asistencias-service.service';

@Component({
  selector: 'app-attendance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './attendance-form.component.html',
  styleUrl: './attendance-form.component.css'
})
export class AttendanceFormComponent {

  private materiasService = inject(MateriasServiceService);
  private asistenciaService = inject(AsistenciasServiceService);
  private fb = inject(FormBuilder);

  carreras: CarrerasInterfaz[] = [];
  materias: MateriaInterfaz[] = [];
  inscripciones: InscripcionInterfaz[] = [];

  ngOnInit() {
    this.carrerasConMaterias();
  }

  // ---------------- FORMULARIOS ----------------

  estudiantesForm = this.fb.group({
    idCarrera: ['', Validators.required],
    idMateria: ['', Validators.required],
  });

  asistenciaForm = this.fb.group({
    asisFecha: ['', Validators.required],
    asistencias: this.fb.array([], Validators.required)
  });

  // ---------------- GETTERS ----------------

  get asistenciasArray(): FormArray {
    return this.asistenciaForm.get('asistencias') as FormArray;
  }

  // ---------------- CREAR CONTROLES ----------------

  crearAsistencias() {
    this.asistenciasArray.clear();

    if (this.inscripciones.length === 0) return;

    this.inscripciones.forEach(inscripcion => {
      this.asistenciasArray.push(
        this.fb.group({
          asisJustificada: [false],
          estadoAsistencia: ['', Validators.required], // ❗ obligatorio
          idInscripcion: [inscripcion.idInscripciones, Validators.required],
        })
      );
    });
  }

  // ---------------- GUARDAR ----------------

  cargarAsistencias() {

    // 🔴 VALIDACIÓN 1: carrera y materia
    if (this.estudiantesForm.invalid) {
      this.estudiantesForm.markAllAsTouched();
      alert('Debe seleccionar carrera y materia');
      return;
    }

    // 🔴 VALIDACIÓN 2: fecha
    if (this.asistenciaForm.get('asisFecha')?.invalid) {
      this.asistenciaForm.get('asisFecha')?.markAsTouched();
      alert('Debe seleccionar una fecha');
      return;
    }

    // 🔴 VALIDACIÓN 3: debe haber alumnos cargados
    if (this.asistenciasArray.length === 0) {
      alert('No hay alumnos para cargar asistencia');
      return;
    }

    // 🔴 VALIDACIÓN 4: todos los estados deben estar completos
    if (this.asistenciaForm.invalid) {
      this.asistenciaForm.markAllAsTouched();
      alert('Debe seleccionar el estado de asistencia de todos los alumnos');
      return;
    }

    const fecha = this.asistenciaForm.get('asisFecha')!.value;

    const requests = this.asistenciasArray.controls.map(control => {
      const asistencia: AsistenciaInterfaz = {
        ...control.value,
        asisFecha: fecha
      };
      return this.asistenciaService.guardarAsistencia(asistencia);
    });

    forkJoin(requests).subscribe({
      next: () => {
        alert('Asistencias guardadas correctamente');

        // reset total
        this.asistenciaForm.reset();
        this.asistenciasArray.clear();
        this.estudiantesForm.reset();

        this.inscripciones = [];
        this.materias = [];
      },
      error: (error) => {
        console.error('Error guardando asistencias:', error);
      }
    });
  }

  // ---------------- DATOS ----------------

  carrerasConMaterias() {
    this.materiasService.materiasConCarreras().subscribe({
      next: (response) => this.carreras = response,
      error: (error) => console.log('Error al cargar carreras', error)
    });
  }

  seleccionarMateriasSegunCarrera() {
    const idCarrera = Number(this.estudiantesForm.value.idCarrera);
    this.materias = this.carreras.find(c => c.id === idCarrera)?.materias || [];
  }

  buscarInscripcionsPorIdMateria() {
    const idMateria = Number(this.estudiantesForm.value.idMateria);

    this.asistenciaService.inscripcionesPorIdMateria(idMateria).subscribe({
      next: (response) => {
        this.inscripciones = response;
        this.crearAsistencias();
      },
      error: (error) => console.log('Error al buscar inscripciones', error)
    });
  }
}

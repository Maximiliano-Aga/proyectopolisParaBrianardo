import { Component } from '@angular/core';
import { CarrerasInterfaz } from '../../../core/interfaces/carreras/carreras-interfaz';
import { MateriasServiceService } from '../../../core/services/materias/materias-service.service';
import { inject } from '@angular/core';
import { MateriaInterfaz } from '../../../core/interfaces/Materias/materia-interfaz';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup, FormArray } from '@angular/forms';
import { InscripcionInterfaz } from '../../../core/interfaces/inscripciones/inscripcion-interfaz';
import { AsistenciasServiceService } from '../../../core/services/Asistencias/asistencias-service.service';
import { AsistenciaInterfaz } from '../../../core/interfaces/asistencias/asistencia-interfaz';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-justify-absence',
  imports: [ReactiveFormsModule],
  templateUrl: './justify-absence.component.html',
  styleUrl: './justify-absence.component.css'
})
export class JustifyAbsenceComponent {
  private materiasService = inject(MateriasServiceService);
  private asistenciaService = inject(AsistenciasServiceService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.carrerasConMaterias();
  }

  estudiantesForm = this.fb.group({
    idCarrera: [0, Validators.required],
    idMateria: [0, Validators.required],
    asisFecha: [, Validators.required],
  })

  asistenciaForm = this.fb.group({
    asistencias: this.fb.array([])
  })

  crearAsistencias() {
    if (this.asistencias.length !== 0) {
      this.asistencias.forEach(asistencia => {
        const control = this.fb.group({
          asisJustificada: asistencia.asisJustificada,
          estadoAsistencia: asistencia.estadoAsistencia,
          idInscripcion: asistencia.idInscripcion,
        });
        (this.asistenciaForm.get('asistencias') as FormArray).push(control);
      });
    }
  }

  cargarAsistencias() {
    if (this.asistenciaForm.valid) {
      const asistenciasFormArray = this.asistenciaForm.get('asistencias') as FormArray;
      const requests = asistenciasFormArray.controls.map(control => {
        const asistencia: AsistenciaInterfaz = control.value;
        asistencia.asisFecha = this.estudiantesForm.get("asisFecha")?.value!;
        return this.asistenciaService.guardarAsistencia(asistencia);
      });
      forkJoin(requests).subscribe({
        next: (respuestas) => {
          alert("Asistencias guardadas correctamente");
          this.asistenciaForm.reset();
          asistenciasFormArray.clear();
          this.estudiantesForm.reset();
          this.crearAsistencias();
        },
        error: (error) => {
          console.error("Error guardando asistencias:", error);
        }
      });
    } else {
      this.asistenciaForm.markAllAsTouched();
    }
  }

  carreras: CarrerasInterfaz[] = [];
  materias?: MateriaInterfaz[] = [];
  asistencias: any[] = [];

  carrerasConMaterias() {
    this.materiasService.materiasConCarreras().subscribe({
      next: (response) => {
        this.carreras = response;
      },
      error: (error) => {
        console.log("Error al cargar carreras y materias", error);
      }
    })    
  }

  seleccionarMateriasSegunCarrera() {
    const idCarrera = Number(this.estudiantesForm.controls.idCarrera.value);
    this.materias = this.carreras.find(carrera => carrera.id === idCarrera)?.materias;
    console.log(idCarrera);
    console.log(this.materias);
  }

  buscarInscripcionsPorIdMateriaYFecha() {
    const idMateria = Number(this.estudiantesForm.controls.idMateria.value);
    const fecha = this.estudiantesForm.controls.asisFecha.value as unknown as string;
    this.asistenciaService.inscripcionesAusentes(idMateria, fecha).subscribe({
      next: (response) => {
        this.asistencias = response;
        const fa = this.asistenciaForm.get('asistencias') as FormArray;
        fa.clear();
        this.crearAsistencias();
      },
      error: (error) => {
        console.log("Error al buscar inscripciones", error)
      }
    })
  }
}

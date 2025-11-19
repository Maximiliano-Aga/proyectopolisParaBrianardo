import { Component } from '@angular/core';
import { CarrerasInterfaz } from '../../../core/interfaces/carreras/carreras-interfaz';
import { MateriasServiceService } from '../../../core/services/materias/materias-service.service';
import { inject } from '@angular/core';
import { MateriaInterfaz } from '../../../core/interfaces/Materias/materia-interfaz';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InscripcionInterfaz } from '../../../core/interfaces/inscripciones/inscripcion-interfaz';
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

  ngOnInit() {
    this.carrerasConMaterias();
  }

  asistenciaForm = this.fb.group({
    idCarrera: [0, Validators.required],
    idMateria: [0, Validators.required]
  })

  carreras: CarrerasInterfaz[] = [];
  materias?: MateriaInterfaz[] = [];
  inscripciones: InscripcionInterfaz[] = [];

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
    const idCarrera = Number(this.asistenciaForm.controls.idCarrera.value);
    this.materias = this.carreras.find(carrera => carrera.id === idCarrera)?.materias;
    console.log(idCarrera);
    console.log(this.materias);
  }

  buscarInscripcionsPorIdMateria() {
    console.log("AAA")
    const idMateria = Number(this.asistenciaForm.controls.idMateria.value);
    this.asistenciaService.inscripcionesPorIdMateria(idMateria).subscribe({
      next: (response) => {
        this.inscripciones = response;
      },
      error: (error) => {
        console.log("Error al buscar inscripciones", error)
      }
    })
  }

}

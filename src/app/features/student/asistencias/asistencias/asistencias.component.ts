import { Component, OnInit } from '@angular/core';
import { AsistenciaSummary, AsistenciasService } from '../../../../core/services/Asistencias/asistencias-service.service';
import { MateriasServiceService } from '../../../../core/services/materias/materias-service.service';
import { MateriaInterfaz } from '../../../../core/interfaces/Materias/materia-interfaz';

@Component({
  selector: 'app-asistencias',
  imports: [],
  templateUrl: './asistencias.component.html',
  styleUrl: './asistencias.component.css'
})
export class AsistenciasComponent implements OnInit {
  
// Inicializamos la variable que contendrá los datos
  materiasConResumen: MateriaConResumen[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Aquí debes obtener el ID del usuario logueado (ejemplo estático)
  alumnoId: number = this.extractUserId();

  constructor(private asistenciasService: AsistenciasService, private materiasService: MateriasServiceService) { }

  ngOnInit(): void {
  this.cargarMateriasConResumen();
}


  cargarResumenPorMateria(item: MateriaConResumen): void {
  this.asistenciasService
    .getSummary(this.alumnoId, item.materia.id)
    .subscribe({
      next: (data) => {
        item.resumen = data;
        item.loading = false;
      },
      error: () => {
        item.error = 'No se pudo cargar el resumen';
        item.loading = false;
      }
    });
}

  cargarMateriasConResumen(): void {
  this.materiasService.materiasPorUsuario(this.alumnoId).subscribe({
    next: (materias) => {
      this.materiasConResumen = materias.map(materia => ({
        materia,
        resumen: null,
        loading: true,
        error: null
      }));

      // Para cada materia, pedimos su resumen
      this.materiasConResumen.forEach(item => {
        this.cargarResumenPorMateria(item);
      });
    },
    error: () => {
      console.error('Error al cargar materias');
    }
  });
}


  private extractUserId(): number {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      try {
        // Parseamos, forzamos el tipo a un objeto con 'id: number' 
        // y retornamos el id. Si no existe o no es un número, usamos 0.
        return (JSON.parse(userJson) as { id: number }).id || 0;
      } catch (e) {
        // Retorna 0 si el JSON no es válido
        return 0;
      }
    }
    
    // Retorna 0 si 'user' no está en localStorage
    return 0;
  }
}

interface MateriaConResumen {
  materia: MateriaInterfaz;
  resumen: AsistenciaSummary | null;
  loading: boolean;
  error: string | null;
}


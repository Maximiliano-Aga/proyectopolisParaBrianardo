import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { AsistenciaSummary, AsistenciasService } from '../../../../core/services/Asistencias/asistencias-service.service';
import { MateriasServiceService } from '../../../../core/services/materias/materias-service.service';
import { MateriaInterfaz } from '../../../../core/interfaces/Materias/materia-interfaz';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencias.component.html',
  styleUrl: './asistencias.component.css'
})
export class AsistenciasComponent implements OnInit {

  materiasConResumen: MateriaConResumen[] = [];
  loading: boolean = true;
  error: string | null = null;

  alumnoId!: number;

  constructor(
    private asistenciasService: AsistenciasService,
    private materiasService: MateriasServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.alumnoId = this.extractUserId();
    this.cargarMateriasConResumen();
  }

  // ===============================
  // CARGA DE DATOS
  // ===============================

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

        this.materiasConResumen.forEach(item => {
          this.cargarResumenPorMateria(item);
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar materias';
        this.loading = false;
      }
    });
  }

  // ===============================
  // LÓGICA DE ASISTENCIAS
  // ===============================

  getAsistenciasTotales(resumen: AsistenciaSummary): number {
    return resumen.resumen_asistencias.total_registros;
  }

  /**
   * Presente = 1
   * Tarde = 0.5
   * Ausente = 0
   */
  getAsistencias(resumen: AsistenciaSummary): number {
    const presentes = resumen.resumen_asistencias.presente;
    const tardanzas = resumen.resumen_asistencias.tardanzas;

    return presentes + (tardanzas * 0.5);
  }

  getPorcentajeAsistencia(resumen: AsistenciaSummary): number {
    const total = this.getAsistenciasTotales(resumen);
    if (total === 0) return 0;

    return (this.getAsistencias(resumen) / total) * 100;
  }

  /**
   * >= 80%  → Verde
   * 60–79%  → Naranja
   * < 60%   → Rojo
   */
  getClaseBarra(resumen: AsistenciaSummary): string {
    const porcentaje = this.getPorcentajeAsistencia(resumen);

    if (porcentaje >= 80) {
      return 'bg-success';
    } else if (porcentaje >= 60) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }

  // ===============================
  // UTILIDAD
  // ===============================

  private extractUserId(): number {
    if (!isPlatformBrowser(this.platformId)) {
      return 0;
    }

    const userJson = localStorage.getItem('user');

    if (userJson) {
      try {
        return (JSON.parse(userJson) as { id: number }).id || 0;
      } catch {
        return 0;
      }
    }

    return 0;
  }
}

interface MateriaConResumen {
  materia: MateriaInterfaz;
  resumen: AsistenciaSummary | null;
  loading: boolean;
  error: string | null;
}

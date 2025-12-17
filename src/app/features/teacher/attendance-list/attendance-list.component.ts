import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciasServiceService } from '../../../core/services/Asistencias/asistencias-service.service';
import { AsistenciaInterfaz } from '../../../core/interfaces/asistencias/asistencia-interfaz';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.css'
})
export class AttendanceListComponent implements OnInit {
  private asistenciasService = inject(AsistenciasServiceService);
  asistencias: AsistenciaInterfaz[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    this.loading = true;
    this.asistenciasService.getAllAsistencias().subscribe({
      next: (data) => {
        // Ordenar por fecha descendente (más reciente primero)
        this.asistencias = data.sort((a, b) => new Date(b.asisFecha).getTime() - new Date(a.asisFecha).getTime());
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar asistencias';
        this.loading = false;
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrl: './take-attendance.component.css',
  standalone: true, // asumiendo que tu componente es standalone
  imports: [FormsModule, CommonModule]
})
export class TakeAttendanceComponent implements OnInit {

  fechaSeleccionada: string;

  constructor() {
    this.fechaSeleccionada = this.obtenerFechaDeHoy();
  }

  ngOnInit(): void {
  }

  obtenerFechaDeHoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const day = hoy.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
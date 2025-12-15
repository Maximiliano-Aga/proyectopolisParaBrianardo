import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsistenciasComponent } from '../asistencias/asistencias/asistencias.component';

@Component({
  selector: 'app-attendance-history',
  imports: [RouterModule, AsistenciasComponent],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent {

}

import { Component } from '@angular/core';
import { AttendanceOverviewComponent } from '../../admin/attendance-overview/attendance-overview.component';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [AttendanceOverviewComponent],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.css'
})
export class AttendanceListComponent {

}

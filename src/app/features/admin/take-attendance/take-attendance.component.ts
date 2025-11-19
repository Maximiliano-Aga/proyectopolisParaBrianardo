import { Component } from '@angular/core';
import { AttendanceFormComponent } from "../../attendance/attendance-form/attendance-form.component";
@Component({
  selector: 'app-take-attendance',
  imports: [AttendanceFormComponent],
  templateUrl: './take-attendance.component.html',
  styleUrl: './take-attendance.component.css'
})
export class TakeAttendanceComponent {

}

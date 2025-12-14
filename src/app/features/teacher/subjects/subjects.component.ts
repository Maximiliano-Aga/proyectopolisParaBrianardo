import { Component } from '@angular/core';
import { SubjectManagementComponent } from '../../admin/subject-management/subject-management.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [SubjectManagementComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

}

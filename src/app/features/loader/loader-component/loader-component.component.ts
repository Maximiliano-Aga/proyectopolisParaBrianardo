import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common'; // Necesario para el *ngIf
import { LoaderService } from '../../../core/services/loader/loader-service.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  
  templateUrl: './loader-component.component.html',
  styleUrl: './loader-component.component.css'
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  
  // Acceso directo a la señal para el template
  public isLoading = this.loaderService.isLoading;
}
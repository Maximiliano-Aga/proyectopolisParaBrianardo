import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// 1. NUEVA IMPORTACIÓN: Importa el componente Loader
import { LoaderComponent } from './features/loader/loader-component/loader-component.component'; 
import { LoaderService } from './core/services/loader/loader-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  // Asumo standalone: true, ya que tu proyecto es moderno y el error lo implica
  imports: [
    RouterOutlet, 
    ReactiveFormsModule,
    LoaderComponent // 2. AÑADIDO: Ahora AppComponent sabe cómo usar <app-loader>
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectopolisParaBrianardo';

  private loaderService = inject(LoaderService);
  public isLoading = this.loaderService.isLoading; // <-- Exponer la señal al template
}
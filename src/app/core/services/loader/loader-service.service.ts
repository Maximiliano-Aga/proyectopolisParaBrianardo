import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Signal para manejar el estado de carga
  public isLoading = signal<boolean>(false);
  private requestsCount = 0;

  constructor() { }

  /** Muestra el loader si es la primera petición pendiente. */
  show() {
    this.requestsCount++;
    if (this.requestsCount === 1) {
      this.isLoading.set(true);
    }
  }

  /** Oculta el loader cuando todas las peticiones han terminado. */
  hide() {
    this.requestsCount--;
    if (this.requestsCount <= 0) {
      this.requestsCount = 0; // Previene números negativos
      this.isLoading.set(false);
    }
  }
}
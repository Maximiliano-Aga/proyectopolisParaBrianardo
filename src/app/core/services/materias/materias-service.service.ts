import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrerasInterfaz } from '../../interfaces/carreras/carreras-interfaz';
import { Inject } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MateriasServiceService {

  private http = inject(HttpClient);

  materiasConCarreras(): Observable<CarrerasInterfaz[]> {
    return this.http.get<CarrerasInterfaz[]>(`${enviroment.apiUrl}/carrerasConMaterias`);
  }
  
}

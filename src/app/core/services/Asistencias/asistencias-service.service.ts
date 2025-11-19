import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {Observable} from 'rxjs';
import { InscripcionInterfaz } from '../../interfaces/inscripciones/inscripcion-interfaz';
import { enviroment } from '../../../../enviroment/enviroment';
import { AsistenciaInterfaz } from '../../interfaces/asistencias/asistencia-interfaz';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasServiceService {

  private http = inject(HttpClient);

  inscripcionesPendientes(): Observable<InscripcionInterfaz[]> {
    return this.http.get<InscripcionInterfaz[]>(`${enviroment.apiUrl}/inscripcionesPendientes`);
  }

  actualizarInscripcion(inscripcion: InscripcionInterfaz) {
    return this.http.put<InscripcionInterfaz>(`${enviroment.apiUrl}/inscripciones/${inscripcion.idInscripciones}`, inscripcion);
  }

  inscripcionesPorIdMateria(idMateria: number): Observable<InscripcionInterfaz[]> {
    return this.http.get<InscripcionInterfaz[]>(`${enviroment.apiUrl}/inscripcionesPorMateria/${idMateria}`);
  }

  guardarAsistencia(asistencia: AsistenciaInterfaz): Observable<AsistenciaInterfaz> {
    return this.http.post<AsistenciaInterfaz>(`${enviroment.apiUrl}/asistencias`, asistencia);
  }

}
 
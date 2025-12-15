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

  actualizarAsistencia(asistencia: AsistenciaInterfaz): Observable<AsistenciaInterfaz> {
    return this.http.put<AsistenciaInterfaz>(`${enviroment.apiUrl}/asistencias/${asistencia.idAsist}`, asistencia);
  }

  inscripcionesAusentes(idMateria: number, asisFecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${enviroment.apiUrl}/asistenciasAusentes/${idMateria}/${asisFecha}`);
  }

}

// Define una interfaz para la estructura de la respuesta de Laravel
export interface AsistenciaSummary {
  alumno_id: number;
  nombre: string;
  mensaje: string;
  resumen_asistencias: {
    presente: number;
    faltas: number;
    tardanzas: number;
    total_registros: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el resumen consolidado de asistencias de un alumno
   * usando el endpoint que creaste en ContadorAsistenciasController.
   */
  getSummary(userId: number, materiaId: number): Observable<AsistenciaSummary> {
    return this.http.get<AsistenciaSummary>(`${enviroment.apiUrl}/reportes/asistencias/${userId}/${materiaId}`);
  }
}
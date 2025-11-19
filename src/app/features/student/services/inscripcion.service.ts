import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private apiUrl = `${enviroment.apiUrl}/inscripciones`;

  constructor(private http: HttpClient) { }

  /**
   * Envía una solicitud de inscripción para una materia.
   * IMPORTANTE: idUsuario, cicloLectivo y estadoInscrip deberían ser gestionados en el backend
   * por seguridad y lógica de negocio. Esto se implementa así por la restricción de tiempo.
   * @param materiaId ID de la materia a la que se desea inscribir.
   * @param idUsuario ID del usuario estudiante logueado (debe obtenerse del servicio de autenticación).
   */
  solicitarInscripcion(materiaId: number, idUsuario: number): Observable<any> {
    const currentYear = new Date().getFullYear();
    const inscripcionData = {
      idMateria: materiaId,
      idUsuario: idUsuario,
      cicloLectivo: currentYear,
      estadoInscrip: 'pendiente' // Por defecto, se enviará como pendiente
    };
    return this.http.post(this.apiUrl, inscripcionData);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterfaz } from '../../interfaces/auth/register-interfaz';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { RegisterRespuestaInterfaz } from '../../interfaces/auth/register-respuesta-interfaz';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private http = inject(HttpClient);

  registrarUsuario(data: RegisterInterfaz): Observable<RegisterRespuestaInterfaz> {
    return this.http.post<RegisterRespuestaInterfaz>(`${enviroment.apiUrl}/auth/register`, data);

  }
}

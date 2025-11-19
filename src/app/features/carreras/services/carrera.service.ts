import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from '../models/carrera.model';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private apiUrl = `${enviroment.apiUrl}/carrerasConMaterias`;

  constructor(private http: HttpClient) { }

  getCarrerasConMaterias(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }
}

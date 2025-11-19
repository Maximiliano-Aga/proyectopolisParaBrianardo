import { Materia } from './materia.model';

export interface Carrera {
  id: number;
  carNombre: string;
  materias: Materia[];
  // Agrega aquí otros campos si son necesarios
}

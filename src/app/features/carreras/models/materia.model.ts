export interface Materia {
  id: number;
  matNombre: string;
  inscripcionStatus?: 'no_inscrito' | 'pendiente' | 'aprobada' | 'rechazada'; // Nuevo campo
  // Agrega aquí otros campos si son necesarios
}


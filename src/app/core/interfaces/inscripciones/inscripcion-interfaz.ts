import { Users } from '../users/auth/users';
import { MateriaInterfaz } from '../Materias/materia-interfaz';
export interface InscripcionInterfaz {
    idInscripciones: number,
    cicloLectivo: string,
    estadoInscrip: string,
    created_at: string,
    usuario: Users,
    materia: MateriaInterfaz
}
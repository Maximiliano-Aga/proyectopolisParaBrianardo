import { MateriaInterfaz } from "../Materias/materia-interfaz";

export interface CarrerasInterfaz {
    id: number,
    carNombre: string,
    created_at: string,
    updated_at: string,
    materias: MateriaInterfaz[]
}

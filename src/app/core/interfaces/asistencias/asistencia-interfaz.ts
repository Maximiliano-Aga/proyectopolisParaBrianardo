export interface AsistenciaInterfaz {
    idAsist?: number,
    asisFecha: string,
    asisJustificada: boolean,
    estadoAsistencia: string,
    idInscripcion: number,
    inscripcion?: {
        usuario?: {
            usNombre: string,
            usApellido: string,
            usDocumento: string
        },
        materia?: {
            matNombre: string
        }
    }
}

import { Asignacion } from "./asignacion";

export class UsuarioSesion {

    public constructor(init?: Partial<UsuarioSesion>) {
        Object.assign(this, init);
    }

    username?: string;
    cambioContrasena?: boolean;
    cveUsuario?: string;
    idClues?: number;
    idPerfil?: string;
    client_id?: string;
    cveMatricula?: string;
    perfil?: string;
    asignaciones?: Asignacion[];

    password?: string;
    nombrePersonal?: string;
    primerApellido?: string;
    segundoApellido?: string = "";
    idUnidad?: string;
    presupuestal?: string;
    unidad?: string;
    idModulo?: string;
    authorities: string [] = [];

}

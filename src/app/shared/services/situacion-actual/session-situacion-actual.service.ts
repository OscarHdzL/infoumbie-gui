import {UsuarioSesion} from "../../model/session/usuarioSesion";
import {Asignacion} from "../../model/session/asignacion";
import {AutenticacionService} from "../autenticacion/autenticacion.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionSituacionActualService {

    constructor(private autenticacionService: AutenticacionService) {
    }

    public isNacional(): boolean {
        let usuarioSession: UsuarioSesion = this.autenticacionService.usuarioSesion;
        return parseInt(this.autenticacionService.usuarioSesion.idPerfil) === 13; //rol nacional
    }

    public isGobernador(): boolean {
        let usuarioSession: UsuarioSesion = this.autenticacionService.usuarioSesion;
        return parseInt(this.autenticacionService.usuarioSesion.idPerfil) === 8; //rol gobernador
    }

    public getAsignacion(): Asignacion {
        let usuarioSession: UsuarioSesion = this.autenticacionService.usuarioSesion;

        if (this.autenticacionService.usuarioSesion.asignaciones && this.autenticacionService.usuarioSesion.asignaciones.length > 0) {
            return this.autenticacionService.usuarioSesion.asignaciones[0];
        }
        return undefined;
    }

    public getCveEntidad(): string {
        const usuarioSession: UsuarioSesion = this.autenticacionService.usuarioSesion;

        if (this.autenticacionService.usuarioSesion.asignaciones && this.autenticacionService.usuarioSesion.asignaciones.length > 0) {
            return this.autenticacionService.usuarioSesion.asignaciones[0].idEntidad;
        }
        return undefined;
    }
}

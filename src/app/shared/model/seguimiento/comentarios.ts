export interface Comentarios {

    cveClueComentario: number;
    desComentario: string;
    cveClue: number;
    nomUsuario: string;
    cveUsuarioAlta: string;
    cveUsuarioModifica?: string;
    cveUsuarioBaja?: string;
    fecAlta: Date;
    fecModifica?: Date;
    fecBaja?: Date;
    usuarioAlta?: UsuarioAlta;
}


export class ResponseDetalleComentarios {
    public cveClue: number;
    public cveClueComentario: number;
    public cveUsuarioAlta: string;
    public desComentario: string;
    public documentos: Documentos [];
    public fecAlta: Date;
    public fecModifica: Date;
    public fecBaja: Date;
    public nomUsuario: string;
    public usuarioAlta: Usuario;
    public usuarioBaja: Usuario;
    public usuarioModifica: Usuario; 
    public contieneImgs: boolean;

}

export class Usuario {
    public cvePersonalOperativo: number;
    public cveClues:             number;
    public cveUsuario:           string;
    public cveMatricula:         string;
    public nombre:               string;
    public primerApellido:       null;
    public segundoApellido:      null;
    public correo:               null;
    public clave:                string;
    public usuarioAlta:          string;
    public usuarioModifica:      string;
    public usuarioBaja:          null;
    public fecAlta:              Date;
    public fecModifica:          Date;
    public fecBaja:              null;
    public error:                null;
    public mensajeError:         null;
    public perfil:               Perfil;
}

export class Perfil {
    public cveIndicadorEstado: number;
    public desPerfil:          string;
    public fecAlta:            Date;
    public fecModifica:        null;
    public fecBaja:            null;
    public error:              null;
    public mensajeError:       null;
}
export interface UsuarioAlta {
    nombre: string;
    perfil: Perfil;

}

export class Documentos {
    public cveGaleria: number;
    public cveUsuarioAlta:     string;
    public cveUsuarioModifica: null;
    public cveUsuarioBaja:     null;
    public fecAlta:            Date;
    public fecModifica:        null;
    public fecBaja:            null;
    public nomArchivo:         string;
    public refPathArchivo:     string;
    public uuidArchivo:        string;
}

/*export interface Perfil {
    desPerfil: string;
}*/
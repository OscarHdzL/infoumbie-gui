export class ParamDetAlertas {
    public cveEntidad: number | string;
    public indEstatus?: number;
    public fechaInicio?: string;
    public fechaFin?: string;
}

export class FormFiltros {
    fechaInicio: null = null;
    fechaFin: null = null;
    estatus: null = null;
}

export class ResponseDetalleAlertas {
    public desTitulo:          string;
    public cveAlerta:          number;
    public desAlerta:          string;
    public indEstatus:         number;
    public cveEntidad:         string;
    public nomUsuario:         string;
    public cveUsuarioAlta:     string;
    public cveUsuarioModifica: null;
    public cveUsuarioBaja:     null;
    public fecAlta:            Date;
    public fecModifica:        null;
    public fecBaja:            null;
    public usuarioAlta:        Usuario;
    public usuarioModifica:    Usuario;
    public alertaEvidencia: ArrayEvidencias[];
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

export class Evidencias{
    public mediaType: string;
    public nombreArchivo: string;
    public archivoBase64: string;
}

export class ArrayEvidencias {
    public cveAlertaEvidencia: number;
    public nomArchivo:         string;
    public refPathArchivo:     string;
    public uuidArchivo:        string;
    public cveAlerta:          number;
    public cveUsuarioAlta:     string;
    public cveUsuarioModifica: null;
    public cveUsuarioBaja:     null;
    public fecAlta:            Date;
    public fecModifica:        null;
    public fecBaja:            null;
    public usuarioAlta:        Usuario;
    public usuarioModifica:    Usuario;
}

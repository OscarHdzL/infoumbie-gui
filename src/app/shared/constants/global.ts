export const GLOBAL = {
   baseURL: 'http://localhost:9010',
   contexto: '/encuestas-web',
   appNombre: 'Sistema de Registro de Información para Diagnóstico de Unidades Médicas IMSS Bienestar',
   appVersion: '0.0.0',
   timeout: 60000,
   scalingTimeout: 1500,
   retryTimes: 1,
   paginationLimit: 30
};

export const TOKEN = {
   user: 'encuesta-gui',
   password: '1mssENC*01',
};

export const DEFAULT_VALUE = {
   password: 'encuesta2021'
};

export const MENSAJES_ERROR = {
   http500: 'El servidor no está disponible temporalmente. Favor de intentar más tarde',
   http500Datos: 'Inconsistencia en datos',
   http403: 'La información no está disponible temporalmente. Favor de intentar más tarde',
   http204: 'No existen datos para la consulta solicitada',
   http409: 'El horario del servicio de programación ha terminado',
   http504: 'El servicio de para consultar la curp no está disponible temporalmente. Favor de intentar más tarde'
};

export const MENSAJES_NEGOCIO = {
   requerido: 'Este campo es obligatorio',
   longitudMinima: 'La longitud mínima debe ser ',
   cambioContrasenaError: 'El servicio de cambio de contraseña no está disponible temporalmente. Favor de intentar más tarde',
   contrasenaNoCoinciden: 'Las contraseñas no coinciden',
   contrasenaUserCoinciden: 'La contraseña no puede ser igual a la anterior'
};

export enum ROLES {
      GENERICO = 1
};

export enum VERSION {
   ACTUAL = '1.0'
}

export enum RUBROS {
   DATOS_GENERALES = 1,
   DATOS_GENERALES_DEL_ESTABLECIMIENTO = 13,
   REFERENCIAS = 11,
   MEDICAMENTOS = 12,
   ATENCION_MEDICA = 142,//primer nivel
   ATENCION_MEDICA_2DO_NIVEL = 15, //segundo nivel datos generales
   REFERENCIAS_2DO_NIVEL = 138,
   //MEDICAMENTOS_2DO_NIVEL = 139,
   URGENCIAS_MEDICAS_2DO_NIVEL = 47,
   URGENCIAS_QUIRU_2DO_NIVEL = 48,
   URGENCIAS_GINE_2DO_NIVEL = 50,
   URGENCIAS_OTRO_2DO_NIVEL = 51,
   URGENCIAS_PEDIATRICOS = 49,
   ATENCION_MEDICA_HOSPITALIZACION = 41,
   INSUMOS = 43,
   BIENES_MUEBLES = 335,
   CONSERVACION = 336,
   MEDICAMENTOS_ = 337,
   BIENES_MUEBLES_2DO_NIVEL = 338,
   CONSERVACION_2DO_NIVEL = 339,
   MEDICAMENTOS_2DO_NIVEL = 340
};

export enum TYPES {
   RADIO = "radio",
   LABEL = "label",
   TEXT = "text"
};

export enum EIC_ESTATUS {
   FINALIZADO = 1,
   APROBADO = 2
}

export enum TIPO_CUESTIONARIO {
   ESTATICO = 0,
   DINAMICO = 1
}

export enum TIPO_AUTOCOMPLETE {
   DIAGNOSTICOS = 1,
   MEDICAMENTOS = 2,
   ATENCION_MEDICA = 3,
   URGENCIAS_MEDICAS = 47,
   URGENCIAS_PEDIATRICAS = 49,
   URGENCIAS_OTRAS = 51,
   URGENCIAS_QUIRURGICAS = 48,
   URGENCIAS_GINECOLOGICAS = 50,
   ATENCION_MEDICA_HOSPITALIZACION = 41,
   INSUMOS = 43,
   INSUMOS_2 = 99
}
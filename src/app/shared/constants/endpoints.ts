export const APIs = {

   autenticacion: {
      login: '/msInfoumbie-autenticacion/v1/oauth/token',
      cambioContrasenaPrimerInicio: '/msInfoumbie-autenticacion/v1/user/{0}/renovacion',
      restablecerContrasena: '/msInfoumbie-autenticacion/v1/personal/',
      restablecer: '/msInfoumbie-autenticacion/v1/user/{0}/restablecer'
   },
   home: {
      areas: '/msInfoumbie-tarjetas/v1/areas'
   },
   cuestionarios: {
      rubros: '/msInfoumbie-tarjetas/v1/rubros',
      cuestionarios: '/msInfoumbie-dinamicos/v1/cuestionarios',
      cierreCuestionarioDinamico: "/msInfoumbie-dinamicos/v1/cierre",
      estaticos:{
         primerNivel: {
            atencionMedica: "/msInfoumbie-primernivel/v1/atencion-medica",
            referencias: "/msInfoumbie-primernivel/v1/referencias",
            medicamentos: "/msInfoumbie-primernivel/v1/medicamentos",
         },
         segundoNivel: {
            referencias: "/msInfoumbie-segundonivel/v1/referencias",
            medicamentos: "/msInfoumbie-segundonivel/v1/medicamentos",
            atencionMedica: "/msInfoumbie-segundonivel/v1/atencion-medica",
            urgenciasMedicas: "/msInfoumbie-segundonivel/v1/urgencias-medicas",
            urgenciasOtras: "/msInfoumbie-segundonivel/v1/urgencias-otras",
            urgenciasGinecologicas : "/msInfoumbie-segundonivel/v1/urgencias-ginecologicas",
            urgenciasPediatricas: "/msInfoumbie-segundonivel/v1/urgencias-pediatricas",
            urgenciasQuirurgicas: "/msInfoumbie-segundonivel/v1/urgencias-quirurgicas",
            atencionMedicaHospitalizacion : "/msInfoumbie-segundonivel/v1/atencion-medica-hospitalizacion",
            insumos : "/msInfoumbie-segundonivel/v1/insumos"
         },
      }
   },
   archivos:{
      getAll:'/msInfoumbie-archivos/v1/getFilesAll',
      prueba : '/msInfoumbie-archivos/v1/prueba',
      getZip: '/msInfoumbie-archivos/v1/zip',
      getRubloAll:'/msInfoumbie-archivos/v1/archivos',
      cargaMultiple:'/msInfoumbie-archivos/v1/uploadMultipleFiles',
      delete: '/msInfoumbie-archivos/v1/delete',
      total: '/msInfoumbie-archivos/v1/files/total'
   },
   archivos_public: {
      getAllPublic:'/msInfoumbie-archivos/public/v1/getFilesAll',
      totalPublic: '/msInfoumbie-archivos/public/v1/files/total'
   },
   catalogos:{
      diagnosticosCIE:'/msInfoumbie-catalogos/v1/diagnosticos',
      medicamentos:'/msInfoumbie-catalogos/v1/medicamentos',
      entidadFederativa: '/msInfoumbie-catalogos/v1/entidades-federativas',
      entidadFederativaMesaTrabajo: '/msInfoumbie-catalogos/v1/entidades-federativas-mesa',
      cluesBienestar: '/msInfoumbie-catalogos/v1/clues/bienestar?idEntidad=',
      nombreUnidad: '/msInfoumbie-catalogos/v1/nombre-unidad',
      clues: '/msInfoumbie-catalogos/v1/clues',
      jurisdiccion : '/msInfoumbie-catalogos/v1/jurisdiccion',
      cedulas: '/msInfoumbie-catalogos/v1/cedulas',
      unidades: '/msInfoumbie-catalogos/v1/unidades',
      prueba: '/msInfoumbie-catalogos/v1/prueba'
   },
   catalogos_public:{
      entidadFederativaPublic: '/msInfoumbie-catalogos/public/v1/entidades-federativas',
      jurisdiccionPublic : '/msInfoumbie-catalogos/public/v1/jurisdiccion',
      cluesPublic: '/msInfoumbie-catalogos/public/v1/clues',
   },
   adminUsuarios:{
      usuariosCarga : '/msInfoumbie-admin/v1/admin-usuarios/v1/usuarios-carga',
      usuarios: '/msInfoumbie-admin/v1/admin-usuarios/v1/usuarios',
      usuariosClues: '/msInfoumbie-admin/v1/admin-usuarios/v1/usuarios/clues'
   },
   estadisticas:{
      cuestionarios : '/msInfoumbie-estadisticas/v1/cuestionarios',
      cuestionariosTotal : '/msInfoumbie-estadisticas/v1/cuestionarios/total',
      cuestionariosTotalMesaTrabajo : '/msInfoumbie-estadisticas/v1/cuestionarios/mesa/total',
      cuestionariosClues : '/msInfoumbie-estadisticas/v1/cuestionarios-clues',
      cuestionariosCedulas: '/msInfoumbie-estadisticas/v1/cuestionarios/cedulas',
      cuestionariosCedulasTotal: '/msInfoumbie-estadisticas/v1/cuestionarios/cedulas/total',
      preguntasCedulas: '/msInfoumbie-estadisticas/v1/cuestionarios/cedulas/preguntas',
      preguntasCedulasTotal: '/msInfoumbie-estadisticas/v1/cuestionarios/cedulas/preguntas/total',
      preguntas: '/msInfoumbie-estadisticas/v1/cuestionarios-preguntas',
      preguntasFaltantes: '/msInfoumbie-estadisticas/v1/cuestionarios-preguntas-faltantes',
      preguntasFases: '/msInfoumbie-estadisticas/v1/cuestionarios-fases',
      preguntasFasesTotal: '/msInfoumbie-estadisticas/v1/cuestionarios-fases/total',
      excelConservacion: '/msInfoumbie-estadisticas/v1/excel/conservacion',
      excelBieneMuebles: '/msInfoumbie-estadisticas/v1/cuestionarios/carga-bienes-muebles',
      excelMedicamentos: '/msInfoumbie-estadisticas/v1/cuestionarios/carga-medicamentos',
      adminUsuarios: '/msInfoumbie-estadisticas/v1/usuarios',
      adminUsuariosExcel: '/msInfoumbie-estadisticas/v1/usuarios-carga'
   },
   situacionActual: {
      municipios: '/msInfoumbie-situacionactual/v1/catalogo/municipios',
      localidades: '/msInfoumbie-situacionactual/v1/catalogo/localidades',
      nivelesAtencion: '/msInfoumbie-situacionactual/v1/catalogo/nivelesAtencion',
      clues: '/msInfoumbie-situacionactual/v1/catalogo/clues',
      personal: '/msInfoumbie-situacionactual/v1/personal',
      observaciones: '/msInfoumbie-situacionactual/v1/observaciones',
      tokenSharePoint: '/msInfoumbie-situacionactual/v1/sharepoint/login',
      entidades: 'msInfoumbie-situacionactual/v1/catalogo/entidades',
      recursosMateriales: 'msInfoumbie-situacionactual/v1/recursosMateriales/{0}',
      recursosMaterialesDetalle: 'msInfoumbie-situacionactual/v1/recursosMateriales/{0}/{1}',
      areaMedica: 'msInfoumbie-situacionactual/v1/areaMedica',
      conservacion: 'msInfoumbie-situacionactual/v1/conservacion',
      equipamiento: 'msInfoumbie-situacionactual/v1/equipamiento/getByRefClues/{0}'
   },
   sharePoint: {
      tokenSharePoint: '/apiTokenSharePoint'
   },
   seguimiento:{
      entidades: 'msInfoumbie-seguimiento/v1/catalogo/entidades',
      detalleUnidades: '/msInfoumbie-seguimiento/v1/unidades/',
      periodoSemana: '/msInfoumbie-seguimiento-periodos/v1/semanasperiodos',
      porcentajes: '/msInfoumbie-seguimiento-periodos/v1/proyecto',
      guardarFechaTransferencia: '/msInfoumbie-seguimiento/v1/unidades/fechaTransferencia',
      estatusSemanalEntidadFederativa: '/msInfoumbie-seguimiento/v1/estatusSemanal',
      listadoUnidadesPrincipal: '/msInfoumbie-seguimiento/v1/unidades/totales',
      obtieneAvancesSemanales:'/msInfoumbie-seguimiento/v1/avanceSemanal/getComentarioByTipoAvance',

      //actualizarComentarioAvanceSemanalMT: 'msInfoumbie-seguimiento/v1/avanceSemanal/saveComentarioByTipoAvance?cveAvanceSemanal=&desComentario=Prueba'
      obtieneEstatusSemanalEntidadFederativa:'/msInfoumbie-seguimiento/v1/estatusSemanal',
      actualizarComentarioAvanceSemanalMT: '/msInfoumbie-seguimiento/v1/avanceSemanal/saveComentarioByTipoAvance',
      unidadesComentarios: '/msInfoumbie-seguimiento/v1/unidades/comentarios/{0}',
      guardaComentario: '/msInfoumbie-seguimiento/v1/unidades/comentarios',
      guardarArchivosComentarios: '/msInfoumbie-seguimiento/v1/storage/saveFilesByComentario',
      guardarArchivosAvanceSemanal: '/msInfoumbie-seguimiento/v1/storage/saveFilesByTipoAvance',
      obtenerArchivosMesaTrabajo: '/msInfoumbie-seguimiento/v1/storage/getFilesByTipoAvance',
      obtenerArchivosComentarios: '/msInfoumbie-seguimiento/v1/storage/getFilesByComentario',
      guardarArchivosEstatusSemanal: '/msInfoumbie-seguimiento/v1/storage/saveFilesEvidencia',
      obtenerArchivosEstatusSemanal: '/msInfoumbie-seguimiento/v1/storage/getFilesEvidencia',
      totalUnidades: '/msInfoumbie-seguimiento/v1/unidades',
      catalogoNiveles: '/msInfoumbie-seguimiento/v1/catalogo',
      obtieneDatosAvanceGeneral: '/msInfoumbie-seguimiento-periodos/v1/tareas/avance',
      obtenerListadoIndicadores: '/msInfoumbie-seguimiento/v1/avanceSemanal/getIndicadores',
      actualizarIndicador: '/msInfoumbie-seguimiento/v1/avanceSemanal/saveInidicadores',
      descargarPowerPoint: '/msInfoumbie-seguimiento/v1/pulsoDeSalud/getInformePulsoDeSaludPPTX',
      websocket: '/msInfoumbie-seguimiento/v1/webSocketComponentes',
      unidadesPorConfirmar: '/msInfoumbie-seguimiento/v1/unidades/porConfirmarTotales/{0}/{1}',
      unidadesPorConfirmarDetalle: '/msInfoumbie-seguimiento/v1/unidades/getUnidadesPorConfirmar',
      unidadesConfirmarFecha: '/msInfoumbie-seguimiento/v1/unidades/setFechaUnidadPorConfirmar',
      ubicacionClue: '/msInfoumbie-seguimiento/v1/unidades/getCluesLocalizacion',
      obtenerAlertas: '/msInfoumbie-seguimiento/v1/alertas/getAlertasByParams',
      obtenerEvidenciasAlertas: '/msInfoumbie-seguimiento/v1/alertas/getFilesAlertaEvidencia',
      updateEstatusAlerta: '/msInfoumbie-seguimiento/v1/alertas/updateEstatusAlerta'

   },
   autorizacion: {
         permisos: '/msInfoumbie-permisos/v1/permisos/',
         permisosComponentes: '/msInfoumbie-seguimiento/v1/habilitaComponente/consultaComponentesHabilitados/',
         habilitaPermisoComponente: '/msInfoumbie-seguimiento/v1/habilitaComponente/habilita',
         deshabilitaPermisoComponente: '/msInfoumbie-seguimiento/v1/habilitaComponente/deshabilita'
   },
   alerta: {
      crear: '/msInfoumbie-seguimiento/v1/alertas/saveAlerta',
      alertasActivas: '/msInfoumbie-seguimiento/v1/alertas/getAlertasActivasByParams',
   },
   adminEncuestas: {
      consultaNivel: '/msInfoumbie-admin/v1/admin-encuestas/modulos',
      consultaAreas: '/msInfoumbie-admin/v1/admin-encuestas/consultaAreas',
      guardarEditarArea: '/msInfoumbie-admin/v1/admin-encuestas/guardaArea',
      consultaRubrosYPreguntas: '/msInfoumbie-admin/v1/admin-encuestas/consultaRubros',
      guardarEditarRubro: '/msInfoumbie-admin/v1/admin-encuestas/guardaRubro',
      guardarEditarPregunta: '/msInfoumbie-admin/v1/admin-encuestas/pregunta',
      eliminarRubro: '/msInfoumbie-admin/v1/admin-encuestas/rubro',
      eliminarPregunta: ' /msInfoumbie-admin/v1/admin-encuestas/pregunta',
      consultarTipoRespuesta: '/msInfoumbie-admin/v1/admin-encuestas/tiposRespuesta',
      consultarCatalogoRespuestas: '/msInfoumbie-admin/v1/admin-encuestas/respuestas',
      cargarPreguntas: '/msInfoumbie-admin/v1/admin-encuestas/cargar-preguntas',
      consultarRespuestasPregunta: '/msInfoumbie-admin/v1/admin-encuestas/preguntaRespuesta',
      guardarNuevaRespuesta: '/msInfoumbie-admin/v1/admin-encuestas/respuesta',
      eliminarArea: '/msInfoumbie-admin/v1/admin-encuestas/area'
   }
};



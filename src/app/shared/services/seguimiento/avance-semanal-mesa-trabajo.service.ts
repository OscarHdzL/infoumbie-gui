import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIs } from "../../constants/endpoints";
import {
  ActualizarIndicador,
  AvanceSemanal,
  AvanceSemanalComentario,
  DatosPowerPoint,
  ListadoIndicadores,
  Tab,
} from "../../model/seguimiento/AvanceSemanalMesaTrabajo";
import { AlertService } from "../alert/alert.service";
import { AutenticacionService } from "../autenticacion/autenticacion.service";

@Injectable({
  providedIn: "root",
})
export class AvanceSemanalMesaTrabajoService {
  public patternNumeros: string = "^[0-9]+$";
  public patternNumeroDecimal: any = /^\d*\.\d+$/;

  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService,
    private alertService: AlertService
  ) {}

  obtieneInformacionTipoAvance(
    desSemana: string,
    cveEntidad: string,
    cveTipoAvanceSemanal: number
  ): Observable<AvanceSemanal> {
    return this.http.get<AvanceSemanal>(
      `${APIs.seguimiento.obtieneAvancesSemanales}?desSemana=${desSemana}&cveEntidad=${cveEntidad}&cveTipoAvanceSemanal=${cveTipoAvanceSemanal}`
    );
  }

  public guardaComentario(
    avanceSemanalComentario: AvanceSemanalComentario
  ): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });

    let url: string = "";
    if (avanceSemanalComentario.cveAvanceSemanal) {
      url = `${APIs.seguimiento.actualizarComentarioAvanceSemanalMT}?cveAvanceSemanal=${avanceSemanalComentario.cveAvanceSemanal}&desComentario=${avanceSemanalComentario.desComentario}&desSemana=${avanceSemanalComentario.desSemana}&cveEntidad=${avanceSemanalComentario.cveEntidad}&cveTipoAvanceSemanal=${avanceSemanalComentario.cveTipoAvanceSemanal}&cveUsuarioAlta=${this.autenticacionService.usuarioSesion.cveUsuario}`;
    } else {
      url = `${APIs.seguimiento.actualizarComentarioAvanceSemanalMT}?desComentario=${avanceSemanalComentario.desComentario}&desSemana=${avanceSemanalComentario.desSemana}&cveEntidad=${avanceSemanalComentario.cveEntidad}&cveTipoAvanceSemanal=${avanceSemanalComentario.cveTipoAvanceSemanal}&cveUsuarioAlta=${this.autenticacionService.usuarioSesion.cveUsuario}`;
    }
    return this.http.put<any>(url, {}, { headers: headers });
  }

  public obtenListadoIndicadores(
    cveEntidad: string,
    desSemana: string,
    cveTipoAvanceSemanal: string
  ): Observable<ListadoIndicadores[]> {
    let url: string = `${APIs.seguimiento.obtenerListadoIndicadores}?cveEntidad=${cveEntidad}&desSemana=${desSemana}&cveTipoAvanceSemanal=${cveTipoAvanceSemanal}`;
    return this.http.get<ListadoIndicadores[]>(url);
  }

  public actualizaIndicador(
    datosIndicador: ActualizarIndicador
  ): Observable<ListadoIndicadores[]> {
    let url: string = `${APIs.seguimiento.actualizarIndicador}`;
    return this.http.put<ListadoIndicadores[]>(url, datosIndicador);
  }

  public descargarPowerPoint(
    desSemana: string,
    cveEntidad: string
  ): Observable<DatosPowerPoint> {
    let url: string = `${APIs.seguimiento.descargarPowerPoint}?desSemana=${desSemana}&cveEntidad=${cveEntidad}`;
    return this.http.get<DatosPowerPoint>(url);
  }

  public validaNumeroNegativo(valor: number) {
    if (valor < 0) {
      this.alerta("No se permiten números negativos.");
    }
  }

  public validaFormatoNumero(valor: number) {
    if (
      !valor.toString().match(this.patternNumeros) &&
      !valor.toString().match(this.patternNumeroDecimal)
    ) {
      this.alerta("Solo permiten números.");
    }
  }

  public validaNumeroEntero(valor: number, mensaje: string) {
    if (!valor.toString().match(this.patternNumeros)) {
      this.alerta(mensaje);
    }
  }

  public get tiposMesasTrabajo(): Tab[] {
    return [
      {
        id: 1,
        nombre: "Médica",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        titulosIndicadores: {
          titulo1: "Indicadores",
          titulo2: "% Avance",
        },
        permiso: "MEDICA",
      },
      {
        id: 2,
        nombre: "Conservación",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        titulosIndicadores: {
          titulo1: "Indicadores",
          titulo2: "Unidades",
          titulo3: "Asignado",
          titulo4: "% Avance",
        },
        permiso: "CONS_INFRA",
      },
      {
        id: 11,
        nombre: "Infraestructura",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        permiso: "INFRAESTRUCTURA",
      },
      {
        id: 3,
        nombre: "Servicios Generales",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        permiso: "SERV_GEN",
      },
      {
        id: 4,
        nombre: "Equipamiento",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        titulosIndicadores: {
          titulo1: "Indicadores",
          titulo2: "Piezas",
        },
        permiso: "EQUIPAMIENTO",
      },
      {
        id: 5,
        nombre: "Personal",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        titulosIndicadores: {
          titulo1: "Indicadores",
          titulo2: "Meta",
          titulo3: "Contratados",
          titulo4: "% Avance",
        },
        permiso: "RRHH",
      },
      {
        id: 6,
        nombre: "Tecnología",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        permiso: "TSI",
      },
      {
        id: 7,
        nombre: "Jurídico",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        permiso: "JURIDICO",
      },
      {
        id: 8,
        nombre: "Abasto",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        titulosIndicadores: {
          titulo1: "Indicador",
          titulo2: "% Avance",
        },
        permiso: "ABASTO",
      },
      {
        id: 9,
        nombre: "Finanzas",
        comentario: "",
        cveAvanceSemanal: null,
        listadoIndicadores: [],
        permiso: "FINANZAS",
      },
    ];
  }

  private alerta(mensaje: string) {
    this.alertService.showAlertError(mensaje);
    throw new Error(mensaje);
  }
}

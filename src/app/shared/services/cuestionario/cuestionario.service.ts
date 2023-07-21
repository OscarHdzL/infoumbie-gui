import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIs } from '../../constants/endpoints';
import { RUBROS, TYPES } from '../../constants/global';
import { Cuestionario } from '../../model/cuestionario/cuestionario';
import { Pregunta } from '../../model/cuestionario/pregunta';
import { RubroCuestiona } from '../../model/rubro/RubroCuestiona';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService extends HttpService {

  constructor(private http: HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService) {
    super();
  }

  public getFormGroupObject(preguntas: Pregunta[]) {

    let formGroup = {};

    let bloqueo = parseInt(sessionStorage.getItem('bloqueo') != null && sessionStorage.getItem('bloqueo') != undefined 
        ? sessionStorage.getItem('bloqueo') : '0' );

    preguntas.forEach(pregunta => {

      if (pregunta.controlType == TYPES.LABEL) {
        return;
      }

      switch (pregunta.type) {
        case TYPES.RADIO:
          formGroup[pregunta.id] = pregunta.required
            ? new FormControl((pregunta.values.length >= 1 ? Number(pregunta.values[0].code) : "") , Validators.required)
            : new FormControl(pregunta.values.length >= 1 ? Number(pregunta.values[0].code) : "");
          break;

        case TYPES.TEXT:
          formGroup[pregunta.id] = pregunta.required
            ? new FormControl((pregunta.values.length >= 1 ? pregunta.values[0].value : ""), [Validators.required,Validators.maxLength(pregunta.canMaxima)])
            : new FormControl((pregunta.values.length >= 1 ? pregunta.values[0].value : ""), [Validators.maxLength(pregunta.canMaxima)]);
          break;
        default:
          formGroup[pregunta.id] = pregunta.required
            ? new FormControl((pregunta.values.length >= 1 ? pregunta.values[0].value : ""), Validators.required)
            : new FormControl(pregunta.values.length >= 1 ? pregunta.values[0].value : "");
          break;
      }
    });
    return new FormGroup(formGroup);
  }

  public getCuestionario(idArea: number, idRubro: number) {
    let params = new HttpParams()
      .set('idClues', String(sessionStorage.getItem("idClues")))
      .set('idFase', String(sessionStorage.getItem("idFase")))
      .set('idArea', String(idArea))
      .set('idRubro', String(idRubro))
      .set('idPerfil', String(this.autenticacionService.usuarioSesion.idPerfil))
      .set('tipoOperacion', String(null));

    return this.http.get<Cuestionario[]>(`${APIs.cuestionarios.cuestionarios}`, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
  }

  public getCuestionarioEstatico(idArea: number, idRubro: number) {
    let params = new HttpParams()
      .set('idClues', String(sessionStorage.getItem("idClues")))
      .set('idArea', String(idArea))
      .set('idRubro', String(idRubro));

    let endpoint = "";

    switch (idRubro) {
      case RUBROS.REFERENCIAS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.referencias;
        break;
      case RUBROS.REFERENCIAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.referencias;
        break;
      case RUBROS.MEDICAMENTOS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.medicamentos;
        break;
      case RUBROS.MEDICAMENTOS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.medicamentos;
        break;
      case RUBROS.ATENCION_MEDICA:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.atencionMedica;
        break;
      case RUBROS.ATENCION_MEDICA_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedica;
        break;
      case RUBROS.URGENCIAS_GINE_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasGinecologicas;
        break;
      case RUBROS.URGENCIAS_MEDICAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasMedicas;
        break;
      case RUBROS.URGENCIAS_OTRO_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasOtras;
        break;
      case RUBROS.URGENCIAS_QUIRU_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasQuirurgicas;
        break;
      case RUBROS.URGENCIAS_PEDIATRICOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasPediatricas;
        break;
      case RUBROS.ATENCION_MEDICA_HOSPITALIZACION:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedicaHospitalizacion;
        break;
      case RUBROS.INSUMOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.insumos;
        break;
      default:
        break;
    }

    return this.http.get<any[]>(`${endpoint}`, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
  }

  public postCuestionarioEstatico(cuestionario: any, idRubro) {
    let endpoint = "";
    switch (idRubro) {
      case RUBROS.REFERENCIAS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.referencias;
        break;
      case RUBROS.REFERENCIAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.referencias;
        break;
      case RUBROS.MEDICAMENTOS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.medicamentos;
        break;
      case RUBROS.MEDICAMENTOS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.medicamentos;
        break;
      case RUBROS.ATENCION_MEDICA:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.atencionMedica;
        break;
      case RUBROS.ATENCION_MEDICA_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedica;
        break;
      case RUBROS.URGENCIAS_GINE_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasGinecologicas;
        break;
      case RUBROS.URGENCIAS_MEDICAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasMedicas;
        break;
      case RUBROS.URGENCIAS_OTRO_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasOtras;
        break;
      case RUBROS.URGENCIAS_QUIRU_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasQuirurgicas;
        break;
      case RUBROS.URGENCIAS_PEDIATRICOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasPediatricas;
        break;
      case RUBROS.ATENCION_MEDICA_HOSPITALIZACION:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedicaHospitalizacion;
        break;
      case RUBROS.INSUMOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.insumos;
        break;
      default:
        break;
    }
    return this.http.post<any>(endpoint, cuestionario, { headers: this.httpHeaders }).pipe();
  }

  public putCuestionarioEstatico(cuestionario: any, idRubro) {
    let endpoint = "";
    switch (idRubro) {
      case RUBROS.REFERENCIAS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.referencias;
        break;
      case RUBROS.REFERENCIAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.referencias;
        break;
      case RUBROS.MEDICAMENTOS:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.medicamentos;
        break;
      case RUBROS.MEDICAMENTOS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.medicamentos;
        break;
      case RUBROS.ATENCION_MEDICA:
        endpoint = APIs.cuestionarios.estaticos.primerNivel.atencionMedica;
        break;
      case RUBROS.ATENCION_MEDICA_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedica;
        break;
      case RUBROS.URGENCIAS_GINE_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasGinecologicas;
        break;
      case RUBROS.URGENCIAS_MEDICAS_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasMedicas;
        break;
      case RUBROS.URGENCIAS_OTRO_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasOtras;
        break;
      case RUBROS.URGENCIAS_QUIRU_2DO_NIVEL:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasQuirurgicas;
        break;
      case RUBROS.URGENCIAS_PEDIATRICOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.urgenciasPediatricas;
        break;
      case RUBROS.ATENCION_MEDICA_HOSPITALIZACION:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.atencionMedicaHospitalizacion;
        break;
      case RUBROS.INSUMOS:
        endpoint = APIs.cuestionarios.estaticos.segundoNivel.insumos;
        break;
      default:
        break;
    }

    return this.http.put<any>(endpoint, cuestionario, { headers: this.httpHeaders }).pipe();
  }

  public postCuestionario(cuestionario: Cuestionario) {
    return this.http.post<any>(APIs.cuestionarios.cuestionarios, cuestionario, { headers: this.httpHeaders }).pipe();
  }

  public postCerrarCuestionario(rubroCuestiona: RubroCuestiona) {
    return this.http.post<any>(APIs.cuestionarios.cierreCuestionarioDinamico, rubroCuestiona, { headers: this.httpHeaders }).pipe();
  }

}
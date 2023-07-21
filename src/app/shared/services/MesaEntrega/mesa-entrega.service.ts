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
import { MesaEntregaModel, vwMesaEntregaModel } from '../../model/MesaEntrega/MesaEntregaModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesaEntregaService extends HttpService {

  public enviarMesa$: BehaviorSubject<vwMesaEntregaModel> = new BehaviorSubject(null);
  constructor(private http: HttpClient,
    private router: Router) {
    super();
  }

  
  public getMesaEntregaActual(): Observable<any> { 
    return this.enviarMesa$.asObservable(); 
  }
  
  public setMesaEntregaActual (mesa: vwMesaEntregaModel){ 
    return this.enviarMesa$.next(mesa);
  }


  public getCatMesaEntrega() {
    return this.http.get<MesaEntregaModel[]>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.consultaMesaEntregaTodos}`).pipe();
  }

  public getVwMesaEntrega() {
    return this.http.get<vwMesaEntregaModel[]>(`${environment.mesaEntregaServices}${APIs.mesaEntrega.consultavwMesaEntregaTodos}`).pipe();
  }


 /* 
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
 */
}
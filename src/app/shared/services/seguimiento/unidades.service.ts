import {
  IUnidadConfirmar,
  IUnidades,
  IUnidadesRequest,
} from "./../../model/seguimiento/unidades";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "../../constants/endpoints";
import { FormatString } from "../../utils/utileria";

@Injectable({
  providedIn: "root",
})
export class UnidadesService {
  private semana$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  getUnidadesPorConfirmarDetalle(
    body: IUnidadesRequest
  ): Observable<IUnidades> {
    return this.http.post<IUnidades>(
      APIs.seguimiento.unidadesPorConfirmarDetalle,
      body
    );
  }

  setSubjectFecha(fecha: string) {
    this.semana$.next(fecha);
  }

  getSubjectFecha$(): Observable<string> {
    return this.semana$.asObservable();
  }

  unidadesConfirmarFecha(body: any): Observable<any> {
    return this.http.post<any>(APIs.seguimiento.unidadesConfirmarFecha, body);
  }

  getUnidadesPorConfirmar( cveEntidad: string, numSemana: string): Observable<IUnidadConfirmar> {
    return this.http.get<IUnidadConfirmar>(
      FormatString(APIs.seguimiento.unidadesPorConfirmar, cveEntidad, numSemana)
    );
  }
}

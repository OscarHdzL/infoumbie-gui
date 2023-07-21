import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIs } from "../../constants/endpoints";
import { AvanceSemanalComentario } from "../../model/seguimiento/AvanceSemanalMesaTrabajo";
import { AutenticacionService } from "../autenticacion/autenticacion.service";
import {ArchivoResponse} from "../../model/seguimiento/Archivo";

@Injectable({
  providedIn: "root",
})
export class ArchivosService {
  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  public subirArchivosMesaTrabajo(
    archivos: File[],
    avanceSemanalComentario: AvanceSemanalComentario
  ): Observable<any> {
    let url: string = `${APIs.seguimiento.guardarArchivosAvanceSemanal}?desSemana=${avanceSemanalComentario.desSemana}&cveEntidad=${avanceSemanalComentario.cveEntidad}&cveTipoAvanceSemanal=${avanceSemanalComentario.cveTipoAvanceSemanal}&cveUsuarioAlta=${this.autenticacionService.usuarioSesion.cveUsuario}`;
    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("files", archivo);
    });

    return this.http.put<any>(url, formData, {});
  }

  public obtenerArchivosMesaTrabajo(avanceSemanalComentario: AvanceSemanalComentario): Observable<ArchivoResponse[]> {
    let url: string = `${APIs.seguimiento.obtenerArchivosMesaTrabajo}?desSemana=${avanceSemanalComentario.desSemana}&cveEntidad=${avanceSemanalComentario.cveEntidad}&cveTipoAvanceSemanal=${avanceSemanalComentario.cveTipoAvanceSemanal}`;
    return this.http.get<ArchivoResponse[]>(url);
  }

  public subirArchivosComentarios(
      archivos: File[],
      cveClueComentario: number,
      cveEntidad: string
  ): Observable<any> {
    let url: string = `${APIs.seguimiento.guardarArchivosComentarios}?cveClueComentario=${cveClueComentario}&cveEntidad=${cveEntidad}&cveUsuarioAlta=${this.autenticacionService.usuarioSesion.cveUsuario}`;
    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("files", archivo);
    });

    return this.http.put<any>(url, formData, {});
  }

  public obtenerArchivosComentarios(cveClueComentario: number, cveEntidad: string): Observable<ArchivoResponse[]> {
    let url: string = `${APIs.seguimiento.obtenerArchivosComentarios}?cveClueComentario=${cveClueComentario}&cveEntidad=${cveEntidad}`;
    return this.http.get<ArchivoResponse[]>(url);
  }

  public subirArchivosEstatusSemanal(archivos: File[], desSemana: number, cveEntidad: string
  ): Observable<any> {
    let url: string = `${APIs.seguimiento.guardarArchivosEstatusSemanal}?desSemana=${desSemana}&cveEntidad=${cveEntidad}&cveUsuarioAlta=${this.autenticacionService.usuarioSesion.cveUsuario}`;
    const formData = new FormData();

    archivos.forEach((archivo) => {
      formData.append("files", archivo);
    });

    return this.http.put<any>(url, formData, {});
  }

  public obtenerArchivosEstatusSemanal(desSemana: number, cveEntidad: string): Observable<ArchivoResponse[]> {
    let url: string = `${APIs.seguimiento.obtenerArchivosEstatusSemanal}?desSemana=${desSemana}&cveEntidad=${cveEntidad}`;
    return this.http.get<ArchivoResponse[]>(url);
  }
}

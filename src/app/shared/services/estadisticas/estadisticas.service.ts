import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { Estadisticas } from '../../model/estadisticas/estadisticas';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService extends HttpService{

    constructor(private http: HttpClient,
        private autenticacionService: AutenticacionService) {
        super();
    }

    public getEstadisticas(clues: string , jurisdiccion : number, idEntidad: number,  pagina: number, idNivel : number, mesaTrabajo : number){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('pagina' , String(pagina))
            .set('idNivel', String(idNivel))
            .set('mesaTrabajo', String(mesaTrabajo));


        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionarios, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getEstadisticasTotal(clues: string , jurisdiccion : number, idEntidad: number, tipo: number, idNivel: number){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('tipo',  String(tipo))
            .set('nivelAtencion', String(idNivel));

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosTotal, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getEstadisticasTotalMesaTrabajo(idClues: number , tipo: number){
        let params = new HttpParams()
            .set('idClues', String(idClues)  )
            .set('tipo',  String(tipo));
        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosTotalMesaTrabajo, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getEstadisticasCedulas(idEntidad: number, idJurisdiccion: number, nivelAtencion : number, clues: string, pagina: number){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
            .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion))
            .set('pagina', pagina == null ? '' : String(pagina)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosCedulas, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getEstadisticasCedulasTotal(idEntidad: number, idJurisdiccion: number, nivelAtencion : number, clues: string){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
            .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion));

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosCedulasTotal, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getEstadisticasCedulaPreguntas( clues: string, cedula: string, pagina: number){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('cedula', cedula == null || cedula == '' ? '' : String(cedula)  )
            .set('pagina', pagina == null ? '' : String(pagina)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.preguntasCedulas, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }


    public getEstadisticasCedulaPreguntasTotal( clues: string, cedula: string){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('cedula', cedula == null || cedula == '' ? '' : String(cedula)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.preguntasCedulasTotal, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    

    public getEstadisticasNoClues(clues: string , jurisdiccion : number, idEntidad: number, pagina: number, idNivel: number,mesaTrabajo: number){
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('pagina' , String(pagina))
            .set('nivelAtencion', String(idNivel))
            .set('mesaTrabajo', String(mesaTrabajo));
    
        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosClues, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getPreguntasRespuestas(clues: string,idEntidad: number){
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));
        
        return this.http.get(APIs.estadisticas.preguntas, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getPreguntasFaltantes(clues: string, idEntidad: number){
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));
        
        return this.http.get(APIs.estadisticas.preguntasFaltantes, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }


    public getPreguntasFases(clues: string, pagina: number){
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('pagina',String(pagina));
        
        return this.http.get(APIs.estadisticas.preguntasFases, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getPreguntasFasesTotal(clues: string){
        let params = new HttpParams()
            .set('clues', String(clues) );
        
        return this.http.get(APIs.estadisticas.preguntasFasesTotal, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public enviarExcelConservacion(archivo: FormData, clues: string){
        let params = new HttpParams()
        .set('clues',String(clues));

        return this.http.post(`${APIs.estadisticas.excelConservacion}`, archivo, {observe: 'response', params: params}).pipe();
    }
    public enviarExcelBienesMuebles(archivo: FormData, cveUsuario: string, refClue: string){
        let params = new HttpParams()
        .set('cveUsuario',String(cveUsuario))
        .set('clues',String(refClue));

        return this.http.post(`${APIs.estadisticas.excelBieneMuebles}`, archivo, {observe: 'response', params: params}).pipe();
    }
    public enviarExcelMedicamentos(archivo: FormData, cveUsuario: string, refClue: string){
        let params = new HttpParams()
        .set('cveUsuario',String(cveUsuario))
        .set('clues',String(refClue));

        return this.http.post(`${APIs.estadisticas.excelMedicamentos}`, archivo, {observe: 'response', params: params}).pipe();
    }


    public getExcelConservacion(clues: string){
        let params = new HttpParams()
            .set('clues', String(clues) );
        
        return this.http.get(APIs.estadisticas.excelConservacion, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getExcelBienesMuebles(cveUsuario: string, refClue: string){
        let params = new HttpParams()
        .set('cveUsuario', String(cveUsuario) )
        .set('clues', String(refClue) );
        
        return this.http.get(APIs.estadisticas.excelBieneMuebles, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getExcelMedicamentos(cveUsuario: string, refClue: string){
        let params = new HttpParams()
        .set('cveUsuario', String(cveUsuario) )
        .set('clues', String(refClue) );
        
        return this.http.get(APIs.estadisticas.excelMedicamentos, {observe: 'response', params: params,headers: this.httpHeaders}).pipe();
    }

    public getAdminUsuarios(){
        return this.http.get(APIs.estadisticas.adminUsuarios, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public enviarExcelUsuarios(archivo: FormData){
        let params = new HttpParams()
        let httpHeadersArchivo = new HttpHeaders({ 'Content-Type': 'multipart/form-data', });

        return this.http.post(`${APIs.estadisticas.adminUsuariosExcel}`, archivo, {observe: 'response', params: params}).pipe();
    }

    public getAdminUsuariosById(idUsuario: number){
        return this.http.get(APIs.estadisticas.adminUsuarios+'/'+idUsuario, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public getPerfilesUsuario(){
        return this.http.get(APIs.estadisticas.adminUsuarios+'/perfiles', {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    
    public getCluesUsuario(){
        return this.http.get(APIs.estadisticas.adminUsuarios+'/clues', {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public getAdminUsuariosCluesUsuario(idUsuario: number){
        return this.http.get(APIs.estadisticas.adminUsuarios+'/clues/'+idUsuario, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public getCluesAsignadasUsuarios(idUsuario: number){
        return this.http.get(APIs.estadisticas.adminUsuarios+'/clues/'+idUsuario, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public updateUsuario(usuario: any){
        return this.http.put(APIs.adminUsuarios.usuarios, usuario, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

    public updateUsuarioCluesAsignacion(data: any){
        return this.http.post(APIs.adminUsuarios.usuarios+'/clues/asignacion', data, {observe: 'response',headers: this.httpHeaders}).pipe();
    }

}

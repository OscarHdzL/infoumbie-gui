import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';
import { Estadisticas } from '../../model/estadisticas/estadisticas';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasConsultaService extends HttpService{

    constructor(private http: HttpClient,
        private autenticacionService: AutenticacionService) {
        super();
    }

    public getEstadisticas(token:string , clues: string , jurisdiccion : number, idEntidad: number,  pagina: number, idNivel : number){
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        

        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('pagina' , String(pagina))
            .set('idNivel', String(idNivel));


        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionarios, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getEstadisticasTotal(token:string ,clues: string , jurisdiccion : number, idEntidad: number, tipo: number, idNivel: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('tipo',  String(tipo))
            .set('nivelAtencion', String(idNivel));

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosTotal, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getEstadisticasCedulas(token:string ,idEntidad: number, idJurisdiccion: number, nivelAtencion : number, clues: string, pagina: number){
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })

        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
            .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion))
            .set('pagina', pagina == null ? '' : String(pagina)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosCedulas, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getEstadisticasCedulasTotal(token:string ,idEntidad: number, idJurisdiccion: number, nivelAtencion : number, clues: string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('idJurisdiccion', idJurisdiccion == null || idJurisdiccion == 0 ? '0' : String(idJurisdiccion))
            .set('nivelAtencion', nivelAtencion == null || nivelAtencion == 0 ? '0' : String(nivelAtencion));

        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosCedulasTotal, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getEstadisticasCedulaPreguntas(token:string , clues: string, cedula: string, pagina: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('cedula', cedula == null || cedula == '' ? '' : String(cedula)  )
            .set('pagina', pagina == null ? '' : String(pagina)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.preguntasCedulas, {observe: 'response', params: params,headers: headers}).pipe();
    }


    public getEstadisticasCedulaPreguntasTotal(token:string , clues: string, cedula: string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('cedula', cedula == null || cedula == '' ? '' : String(cedula)  );

        return this.http.get<Estadisticas[]>(APIs.estadisticas.preguntasCedulasTotal, {observe: 'response', params: params,headers: headers}).pipe();
    }

    

    public getEstadisticasNoClues(token:string , clues: string , jurisdiccion : number, idEntidad: number, pagina: number, idNivel: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', clues == null || clues == '' ? '' : String(clues)  )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad))
            .set('jurisdiccion', jurisdiccion == null || jurisdiccion == 0 ? '0' : String(jurisdiccion))
            .set('pagina' , String(pagina))
            .set('nivelAtencion', String(idNivel));
    
        return this.http.get<Estadisticas[]>(APIs.estadisticas.cuestionariosClues, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getPreguntasRespuestas(token:string , clues: string,idEntidad: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));
        
        return this.http.get(APIs.estadisticas.preguntas, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getPreguntasFaltantes(token:string , clues: string, idEntidad: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('idEntidad', idEntidad == null || idEntidad == 0 ? '0' : String(idEntidad));
        
        return this.http.get(APIs.estadisticas.preguntasFaltantes, {observe: 'response', params: params,headers: headers}).pipe();
    }


    public getPreguntasFases(token:string , clues: string, pagina: number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', String(clues) )
            .set('pagina',String(pagina));
        
        return this.http.get(APIs.estadisticas.preguntasFases, {observe: 'response', params: params,headers: headers}).pipe();
    }

    public getPreguntasFasesTotal(token:string , clues: string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': ('bearer ' + token).replace("\"", "").replace("\"", "")
        })
        
        let params = new HttpParams()
            .set('clues', String(clues) );
        
        return this.http.get(APIs.estadisticas.preguntasFasesTotal, {observe: 'response', params: params,headers: headers}).pipe();
    }


}
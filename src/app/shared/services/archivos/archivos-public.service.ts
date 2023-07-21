import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
    providedIn: 'root'
})
export class ArchivosPublicService extends HttpService {

    constructor(
        private http: HttpClient,
        private autenticacionService: AutenticacionService
    ) {
        super();
    }

    getAll(idClues :any , clues: string, tipo: string, pagina: number){
        let params = new HttpParams()
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', idClues == null || idClues == 0 ? '0' : String(idClues))
        .set('clues', clues == null || clues == '' ? '' : String(clues)  )
        .set('tipo', tipo == null || tipo == '' ? '' : String(tipo)  )
        .set('pagina', pagina == null ? '' : String(pagina)  );
        //.set('idNivel', String(idNivel)  );

        //let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });
        return this.http.get(`${APIs.archivos_public.getAllPublic}`, {observe: 'response', params: params, headers: this.httpHeadersAnon})
        .pipe();
    }

    getFilesTotal(idClues :any , clues: string, tipo: string){
        let params = new HttpParams()
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', idClues)
        .set('clues', clues == null || clues == '' ? '' : String(clues)  )
        .set('tipo', tipo == null || tipo == '' ? '' : String(tipo)  );

        return this.http.get(`${APIs.archivos_public.totalPublic}`, {observe: 'response', params: params, headers: this.httpHeadersAnon})
        .pipe();
    }

}
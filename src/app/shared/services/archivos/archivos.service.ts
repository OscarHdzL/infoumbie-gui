import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../constants/endpoints';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
    providedIn: 'root'
})
export class ArchivosService extends HttpService {

    constructor(
        private http: HttpClient,
        private autenticacionService: AutenticacionService
    ) {
        super();
    }

    prueba(){
        return this.http.get(`${APIs.archivos.prueba}`, {observe: 'response', params: null})
        .pipe();
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
        return this.http.get(`${APIs.archivos.getAll}`, {observe: 'response', params: params})
        .pipe();
    }

    getFilesTotal(idClues :any , clues: string, tipo: string){
        let params = new HttpParams()
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', idClues)
        .set('clues', clues == null || clues == '' ? '' : String(clues)  )
        .set('tipo', tipo == null || tipo == '' ? '' : String(tipo)  );

        return this.http.get(`${APIs.archivos.total}`, {observe: 'response', params: params})
        .pipe();
    }

    getZipImagenes(clues: string, idEntidad: number){

        let params = new HttpParams()
        .set('idClues', String(clues))
        .set('idEntidad', String(idEntidad));

        //let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });
        return this.http.get(`${APIs.archivos.getZip}`, {observe: 'response', params: params})
        .pipe();
    }
    
    getRubroAll(idArea:number, idRubro:number){
        let params = new HttpParams()
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', String(sessionStorage.getItem("idClues")))
        .set('idArea', String(idArea))
        .set('idRubro', String(idRubro))

        //let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });
        return this.http.get(`${APIs.archivos.getRubloAll}`, {observe: 'response', params: params})
        .pipe();
    }

    postArchivos(archivos: FormData, idArea:number, idRubro:number){
        let params = new HttpParams()
        .set('cveUsuario', String(this.autenticacionService.usuarioSesion.idPerfil))
        .set('idArea', String(idArea))
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', String(sessionStorage.getItem("idClues")))
        .set('idRubro', String(idRubro))

        
        //let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymous': '' });
        return this.http.post(`${APIs.archivos.cargaMultiple}`, archivos, {observe: 'response', params: params})
        .pipe();
    }

    putArchivo(refUid : string){
        let params = new HttpParams()
        .set('cveUsuario', String(this.autenticacionService.usuarioSesion.idPerfil))
        //.set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
        .set('idClues', String(sessionStorage.getItem("idClues")))
        .set('refUid', String(refUid) )

        return this.http.delete(`${APIs.archivos.delete}`, {observe: 'response', params: params})
        .pipe();

    }
}

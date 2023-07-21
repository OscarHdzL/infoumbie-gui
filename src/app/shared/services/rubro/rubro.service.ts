import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIs } from '../../constants/endpoints';
import { NAVEGACION } from '../../constants/navigation';
import { Area } from '../../model/area/area';
import { Rubro } from '../../model/rubro/Rubro';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
    providedIn: 'root'
})
export class RubroService extends HttpService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private autenticacionService: AutenticacionService
    ) {
        super();
    }

    public getRubrosPorArea(idArea:number) {

        let params = new HttpParams()
            .set('idClues', String(sessionStorage.getItem("idClues")))
            .set('idArea', String(idArea));

        return this.http.get<Rubro[]>(`${APIs.cuestionarios.rubros}`, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
    }

    public setRubrosSesion(rubros: Rubro[]){
        sessionStorage.setItem('rubrosSesion', JSON.stringify(rubros));
    }

    public getRubrosSesion(){
        return JSON.parse(sessionStorage.getItem('rubrosSesion'));
    }

    public deleteRubrosSesion(){
        sessionStorage.removeItem('rubrosSesion');
    }

    public navigateAreaCards(areaSeleccionada: Area) {
        return this.router.navigate([NAVEGACION.cuestionario.contenedor], { state: { areaSeleccionada: areaSeleccionada } });
    }

}
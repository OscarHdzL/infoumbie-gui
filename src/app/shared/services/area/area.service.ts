import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIs } from '../../constants/endpoints';
import { NAVEGACION } from '../../constants/navigation';
import { Area } from '../../model/area/area';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpService } from '../common/http.service';

@Injectable({
    providedIn: 'root'
})
export class AreaService extends HttpService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private autenticacionService: AutenticacionService
    ) {
        super();
    }

    public getArea() {

        let params = new HttpParams()
            // .set('idClues', String(this.autenticacionService.usuarioSesion.idClues))
            // .set('idModulo', String(this.autenticacionService.usuarioSesion.asignaciones[0].idModulo));
            .set('idClues', String(sessionStorage.getItem("idClues")))
            .set('idModulo', String(sessionStorage.getItem("idModulo")));


        return this.http.get<Area[]>(`${APIs.home.areas}`, { observe: 'response', params: params, headers: this.httpHeaders }).pipe();
    }

    public navigateAreaCards(areaSeleccionada: Area) {
        if (areaSeleccionada.area == "ANEXAR DOCUMENTOS") 
            return this.router.navigate([NAVEGACION.archivos], { state: { areaSeleccionada: areaSeleccionada } });
        else
            return this.router.navigate([NAVEGACION.cuestionario.contenedor], { state: { areaSeleccionada: areaSeleccionada } });
    }

}
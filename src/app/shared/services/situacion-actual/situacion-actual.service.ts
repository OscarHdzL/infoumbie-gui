import {Injectable} from "@angular/core";
import {APIs} from "../../constants/endpoints";
import {HttpClient} from "@angular/common/http";
import {AutenticacionService} from "../autenticacion/autenticacion.service";
import {Observable, throwError} from "rxjs";
import {Observacion} from "../../model/situacion-actual/Observacion";
import {TokenSharePoint} from "../../model/situacion-actual/TokenSharePoint";
import {SharePointService} from "./share-point.service";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SituacionActualService extends SharePointService {

    constructor(public http: HttpClient,
                private autenticacionService: AutenticacionService) {
        super(http);
    }

    public getObservaciones(cveClue: number): Observable<Observacion[]>{
        return this.http.get<Observacion[]>(`${APIs.situacionActual.observaciones}/${cveClue}`);
    }

    public getTokenSharePoint(): Observable<TokenSharePoint>{
        return this.http.get<TokenSharePoint>(`${APIs.situacionActual.tokenSharePoint}`)
        .pipe(
            tap(resp=>{
                try {
                    sessionStorage.setItem('token-sharePoint', resp.access_token);
                } catch (error) {
                    console.log(error);
                    throw  throwError('Error al generar la respuesta del servicio del token');
                }
               
            })
        );
    }
}
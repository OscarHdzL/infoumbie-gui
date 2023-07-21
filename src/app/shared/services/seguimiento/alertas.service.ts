import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import { ArrayEvidencias, Evidencias, ParamDetAlertas, ResponseDetalleAlertas } from '../../model/seguimiento/alertas';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AlertasService extends HttpService{

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public getAlertas(datos: ParamDetAlertas): Observable<any>{
    return this.http.post<ResponseDetalleAlertas[]>(`${APIs.seguimiento.obtenerAlertas}`, datos)
    .pipe(
      tap((alertas: ResponseDetalleAlertas[]) => {

        let arrayAlertas: ResponseDetalleAlertas [] = [];
        if(alertas.length > 0){
          alertas.forEach(alerta => {
            let auxAlerta: ResponseDetalleAlertas = new ResponseDetalleAlertas();
             auxAlerta = alerta;
             auxAlerta.contieneImgs = this.validarTipoArchivo(alerta.alertaEvidencia);
        
             arrayAlertas.push(auxAlerta);
          });
        }else{
          let auxAlerta: ResponseDetalleAlertas = new ResponseDetalleAlertas();
          auxAlerta.contieneImgs = false;
     
          arrayAlertas.push(auxAlerta);
        }
      
       
        return arrayAlertas;
      })
    );
  }

  private validarTipoArchivo(arreglo: ArrayEvidencias []): boolean{
    let bandera: boolean = false;
    if(arreglo && arreglo.length > 0){
        arreglo.map(archivo => {
          //Validamos si las evidencias de la alerta son imagenes
          if(archivo.nomArchivo.includes('jpg') || archivo.nomArchivo.includes('png') || archivo.nomArchivo.includes('jpeg')){
            bandera = true;
          }else{
            bandera = false;
          }
        });
    }else{
      bandera = false;
    }
    
    return bandera;
    
  }

  public getEvidencias(cveEntidad: string, cveAlerta: number): Observable<Evidencias[]>{
    let formData = new FormData();
    formData.append('cveEntidad', cveEntidad);
    formData.append('cveAlerta', String(cveAlerta));

    return this.http.post<Evidencias[]>(`${APIs.seguimiento.obtenerEvidenciasAlertas}`, formData);
  }

  public updateEstatusAlerta(cveAlerta: number): Observable<any>{
    return this.http.post<number>(`${APIs.seguimiento.updateEstatusAlerta}/${cveAlerta}`, { headers: this.httpHeaders } );
  }

}

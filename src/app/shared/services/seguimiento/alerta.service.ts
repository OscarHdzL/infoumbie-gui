import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Alerta } from "../../model/seguimiento/alerta";
import { APIs } from "../../constants/endpoints";

@Injectable({
  providedIn: "root",
})
export class AlertaService {
  constructor(private http: HttpClient) {}

  guardarAlerta(alert: FormData): Observable<Alerta> {
    return this.http.post<Alerta>(APIs.alerta.crear, alert);    
  }

  getAlertasActivas(cveEntidad: any): Observable<Alerta[]> {
    return this.http.post<Alerta[]>(APIs.alerta.alertasActivas, cveEntidad);
  }

}

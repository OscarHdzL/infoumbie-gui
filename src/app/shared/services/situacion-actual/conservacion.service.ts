import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIs } from "../../constants/endpoints";
import { Observable } from "rxjs";
import { SharePointService } from "./share-point.service";
import { Conservacion } from "../../model/situacion-actual/Conservacion";

@Injectable({
  providedIn: "root",
})
export class ConservacionService extends SharePointService {
  constructor(public http: HttpClient) {
    super(http);
  }

  obtenConservaciones(clue: string): Observable<Conservacion> {
    return this.http.get<Conservacion>(
      `${APIs.situacionActual.conservacion}/${clue}`
    );
  }

}

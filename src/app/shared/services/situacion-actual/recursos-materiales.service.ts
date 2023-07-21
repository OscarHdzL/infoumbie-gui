import {Injectable} from '@angular/core';
import {SharePointService} from "./share-point.service";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Columnas} from "../../model/situacion-actual/Columnas";
import {DetalleRecursosMateriales, RecursosMateriales} from "../../model/situacion-actual/RecursosMateriales";
import {RecMatEquiamiento} from "../../model/situacion-actual/equipamiento.model";
import {String} from "typescript-string-operations";
import {APIs} from "../../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class RecursosMaterialesService extends SharePointService {

private idRecursosMateriales: string = '91a2ddff-4588-46a6-97c1-4c6aba57b6a8';

  constructor(public http: HttpClient) {
    super(http);
  }

  public getRecursosMaterialesInfo(refClues: string): Observable<RecursosMateriales> {
    let fields: string[] = ['field_2', 'field_3', 'field_4'];

    return this.getData({
      idLista: this.idRecursosMateriales,
      fields: fields,
      refClues: refClues
    }).pipe(
        //tap(response => console.log('Respuesta', response)),
        map( listaResponse => {
          let recursosMateriales: RecursosMateriales = new RecursosMateriales();
          let detalleRecursosMaterialesList: DetalleRecursosMateriales[] = [];

          let lista:any[] = listaResponse['value'];

          try {
            lista.filter(item => {
              let detalleRecursosMateriales: DetalleRecursosMateriales = new DetalleRecursosMateriales();
              detalleRecursosMateriales.tipo = item['fields']['field_2'];
              detalleRecursosMateriales.desRecursoMaterial = item['fields']['field_3'];
              detalleRecursosMateriales.numCantidad = item['fields']['field_4'];
              detalleRecursosMaterialesList.push(detalleRecursosMateriales);
            });

            recursosMateriales.equipamiento = detalleRecursosMaterialesList.filter(detalle => detalle.tipo === 'Equipamiento');
            recursosMateriales.area = detalleRecursosMaterialesList.filter(detalle => detalle.tipo !== 'Equipamiento');

              recursosMateriales.totalEquipamiento = recursosMateriales.equipamiento.reduce((total, equipamiento) => total = total + equipamiento.numCantidad,0);
              recursosMateriales.totalArea = recursosMateriales.area.reduce((total, area) => total = total + area.numCantidad,0);
          }
          catch(error) {
            console.log(error);
            throw  throwError('Error al generar la respuesta del servicio');
          }

          return recursosMateriales;
        }),
    );

  }

  public getEquipamiento(refClues: string): Observable<RecMatEquiamiento[]> {
      return this.http.get<RecMatEquiamiento[]>(String.Format(APIs.situacionActual.equipamiento, refClues));
  }

}

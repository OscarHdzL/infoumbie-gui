import {Injectable} from '@angular/core';
import {SharePointService} from "./share-point.service";
import {HttpClient} from "@angular/common/http";
import {Columnas} from "../../model/situacion-actual/Columnas";
import {DetallePersonal, PersonalResidentes, PlantillaActual} from "../../model/situacion-actual/Personal";
import {Observable, throwError} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonalService extends SharePointService {

  private idListaPersonal: string = '5378973b-e10f-484d-9d97-9c96b02a442a';
  private idListaPersonalDetalle: string = '7ca74e73-ad3f-4de6-94b8-b4bfc6fec3cf';

  constructor(public http: HttpClient) {
    super(http);
  }

  public getPlantillaActualInfo(refClues: string): Observable<PlantillaActual> {
    let fields: string[] = ['field_2', 'field_3', 'field_4', 'field_5'];

    return this.getDataAndColumns({
        idLista: this.idListaPersonal,
        fields: fields,
        refClues: refClues
    }).pipe(
        tap(response => console.log(response)),
        map( ([columnasResponse, listaResponse]) => {
          let plantillaActual: PlantillaActual = new PlantillaActual();
          let columnas:Columnas[] = columnasResponse['value'];
          let lista:any = listaResponse['value'][0]['fields'];
          let detallePersonalList: DetallePersonal[] = [];

          try {
            //console.log('Columnas', columnas);
            //console.log('lista', lista)
            fields.forEach(field => {
              let detallePersonal = new DetallePersonal();
              let columna:Columnas = columnas.filter(columna => columna.name === field)[0];
              detallePersonal.desPersonal = columna.displayName;
              detallePersonal.numCantidad = lista[field];
              detallePersonalList.push(detallePersonal);
            });

            console.log(detallePersonalList);
            plantillaActual.plantillaActual = detallePersonalList;
            plantillaActual.totalPlantillaActual = detallePersonalList.reduce((total, detallePersonal) => total + detallePersonal.numCantidad, 0);
          }
          catch(error) {
            console.log(error);
            throw  throwError('Error al generar la respuesta del servicio');
          }

          return plantillaActual;
        }),
    );

  }

  public getPersonalResidentes(refClues: string): Observable<PersonalResidentes> {
      let fields: string[] = ['field_2', 'field_3', 'field_4'];

      return this.getData({
          idLista: this.idListaPersonalDetalle,
          fields: fields,
          refClues: refClues
      }).pipe(
          //tap(response => console.log('PersonaResidentes', response)),
          map(listaResponse => {
              let personalResidente: PersonalResidentes = new PersonalResidentes();
              let detallePersonalList: DetallePersonal[];

              let lista:any[] = listaResponse['value'];

              try {
                  lista.forEach(item => {
                      let detallePersonal: DetallePersonal = new DetallePersonal();
                      detallePersonal.desPersonal = item['fields']['field_3'];
                      detallePersonal.numCantidad = item['fields']['field_4'];

                      if (item['fields']['field_2'] === 'Personal salud') {
                          personalResidente.addResidente(detallePersonal);
                      }
                      else {
                          personalResidente.addPersona(detallePersonal);
                      }

                      personalResidente.totalPersonal = personalResidente.personal.reduce((total, registro)=> total = total + registro.numCantidad, 0);
                      personalResidente.totalResidentes = personalResidente.residentes.reduce((total, registro)=> total = total + registro.numCantidad, 0);

                  });
              }
              catch(error) {
                  console.log(error);
                  throw  throwError('Error al generar la respuesta del servicio');
              }
              return personalResidente;
          })
      );
  }


}

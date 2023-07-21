import {Injectable} from '@angular/core';
import {SharePointService} from './share-point.service';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Columnas} from '../../model/situacion-actual/Columnas';
import {DetalleResponsable, Responsable} from '../../model/situacion-actual/Responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService extends SharePointService {

    private idListaPersonal = '10071e3f-8dbf-4c4f-8f7a-538ba3e97733';
    private contador = 0;

    constructor(public http: HttpClient) {
        super(http);
    }

    public getResponsablesInfo(refClues: string): Observable<Responsable> {
        const fields: string[] = ['field_2', 'field_3', 'field_4', 'field_5', 'field_6', 'field_7', 'field_8', 'field_9', 'field_10'];

        return this.getDataAndColumns({
            idLista: this.idListaPersonal,
            fields,
            refClues
        }).pipe(
            tap(response => console.log('Responsable --->', response)),
            map( ([columnasResponse, listaResponse]) => {
                const responsable: Responsable = new Responsable();
                if (listaResponse['value'].length !== 0){
                    const columnas: Columnas[] = columnasResponse['value'];
                    const lista: any = listaResponse['value'][0]['fields'];
                    const detalleResponsableList: DetalleResponsable[] = [];

                    try {
                        fields.forEach(field => {
                            const detalleResponsable = new DetalleResponsable();
                            const columna: Columnas = columnas.filter(columna => columna.name === field)[0];
                            detalleResponsable.desEncabezado = columna.displayName;
                            detalleResponsable.desResponsable = lista[field];
                            detalleResponsableList.push(detalleResponsable);
                        });
                        responsable.responsable = detalleResponsableList;
                        detalleResponsableList.forEach( responsables => {
                            if (responsables.desResponsable) {
                                const coma = ',';
                                const cadena = (responsables.desResponsable).split(coma).length;
                                this.contador = this.contador + cadena.valueOf();
                            }
                        });
                        responsable.totalResponsable = this.contador;
                    }
                    catch (error) {
                        console.log(error);
                        throw  throwError('Error al generar la respuesta del servicio');
                    }
                }
                return responsable;
            }),
        );

    }
}

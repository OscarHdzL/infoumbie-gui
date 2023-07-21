import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  DetallePlanAcciones,
  Estatus,
} from "../../model/situacion-actual/PlanAcciones";
import { SharePointService } from "./share-point.service";

@Injectable({
  providedIn: "root",
})
export class PlanAccionesService extends SharePointService {
  private idPlanAcciones: string = "ed928d45-6023-4d73-be6f-050825143dfd";
  private setConceptos: Set<string>;
  private conceptos: string[] = [];
  private setClavesActividades: Set<string>;
  private clavesActividades: string[] = [];
  private actividadesPorConcepto: DetallePlanAcciones[] = [];

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene plan de acciones de acuerdo a un CLUES proporcionado.
   * @param refClues
   */

  getInfoPlanAccciones(refClues: string): Observable<DetallePlanAcciones[]> {
    const fields: string[] = ["field_1", "field_2", "field_3", "field_4", "field_5", "field_6", "field_7"];
    const filters = {
      idLista: this.idPlanAcciones,
      fields,
      refClues,
    };
    return this.getData(filters).pipe(
      map((resp: any) => {
        let valuesPlanAcciones: any[] = resp.value;
        let datosPlanAcciones: DetallePlanAcciones[] = [];
        valuesPlanAcciones.map(({ fields }) => {
          datosPlanAcciones.push({
            hospital: fields["field_1"].trim(),
            concepto: fields["field_2"].trim(),
            actividad: fields["field_3"].trim(),
            responsable: fields["field_4"].trim(),
          });
        });
        return datosPlanAcciones;
      }),
      catchError((error) => {
        console.log("ERROR AL OBTENER PLAN ACCIONES", error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene conceptos del listado plan de acciones, de acuerdo al CLUES seleccionado
   * @param planAcciones
   * @returns
   */
  getConceptos(planAcciones: DetallePlanAcciones[]): string[] {
    let conceptos: string[] = [];

    if (planAcciones.length <= 0) {
      return (this.conceptos = []);
    }

    planAcciones.map(({ concepto }) => {
      conceptos.push(concepto);
    });

    this.setConceptos = new Set<string>(conceptos);
    this.conceptos = [...this.setConceptos];
    return this.conceptos;
  }

  /**
   * Obtiene actividades, de acuerdo al concepto seleccionado
   * @param planAcciones
   * @param tipoConcepto
   * @returns
   */
  getActividadesPorConcepto(
    planAcciones: DetallePlanAcciones[],
    tipoConcepto: string
  ): DetallePlanAcciones[] {
    this.actividadesPorConcepto = [];
    if (planAcciones.length <= 0) {
      return (this.actividadesPorConcepto = []);
    }

    planAcciones.forEach((planAccion: DetallePlanAcciones) => {
      if (planAccion.concepto.trim() === tipoConcepto.trim()) {
        this.actividadesPorConcepto.push(planAccion);
      }
    });

    return this.actividadesPorConcepto;
  }

  /**
   * Obtiene claves del listado plan de acciones, de acuerdo al CLUES seleccionado
   * @param planAcciones
   * @returns
   */
  obtenClavesDeActividades(planAcciones: DetallePlanAcciones[]): string[] {
    let listaClavesActividades: any = [];

    if (planAcciones.length <= 0) {
      return (listaClavesActividades = []);
    }

    planAcciones.map((actividad) => {
      listaClavesActividades.push(Object.keys(actividad));
    });

    listaClavesActividades.map((claves) => {
      claves.map((clave) => {
        this.clavesActividades.push(clave);
      });
    });

    this.setClavesActividades = new Set<string>(this.clavesActividades);
    return [...this.setClavesActividades];
  }

  listadoDeEstatus(): Estatus[] {
    return [
      {
        nombre: "Pendiente",
        comparacion: "pendiente",
        ponderacion: 1,
      },
      {
        nombre: "En proceso",
        comparacion: "enproceso",
        ponderacion: 2,
      },
      {
        nombre: "Atrasado",
        comparacion: "atrasado",
        ponderacion: 3,
      },
      {
        nombre: "Terminado",
        comparacion: "terminado",
        ponderacion: 4,
      },
      {
        nombre: "Sin estatus",
        comparacion: "sinestatus",
        ponderacion: 0,
      },
    ];
  }

  /**
   *
   * @param estatusDeActividad @description Devuelve un objeto de tipo Estatus, por medio del estatus ingresado
   * @returns
   */
  obtenDatosEstatusPorEstatus(estatusDeActividad: string): Estatus {
    if (estatusDeActividad != null ){
      return this.listadoDeEstatus().find(
        (estatus) =>
          estatus.comparacion.trim() ===
          estatusDeActividad.replace(/\s+/g, "").toLowerCase()
      );
    } else {
      return {
        nombre: "Sin estatus",
        comparacion: "sinestatus",
        ponderacion: 0,
      };
    }
  }

  /**
   * @description Devuelve un objeto de tipo Estatus, por medio de la ponderacion ingresada
   * @param ponderacionEstatus
   * @returns
   */
  obtenDatosEstatusPorPonderacion(ponderacionEstatus: number): Estatus {
    if (ponderacionEstatus != null || ponderacionEstatus !== NaN) {
      return this.listadoDeEstatus().find(
        (estatus) => +estatus.ponderacion === +ponderacionEstatus
      );
    } else {
      return {
        nombre: "Sin estatus",
        comparacion: "sinestatus",
        ponderacion: 0,
      };
    }
  }
}

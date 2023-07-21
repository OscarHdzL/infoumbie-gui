import { Pipe, PipeTransform } from "@angular/core";
import { Estatus } from "src/app/shared/model/situacion-actual/PlanAcciones";
import { PlanAccionesService } from "src/app/shared/services/situacion-actual/plan-acciones.service";

@Pipe({
  name: "estatus",
})
export class EstatusPipe implements PipeTransform {
  datosEstatus: Estatus;

  constructor(private planAccionesService: PlanAccionesService) {}

  transform(textoEstatus: string, esFondo: boolean = true): string {
    this.datosEstatus =
      this.planAccionesService.obtenDatosEstatusPorEstatus(textoEstatus);

    switch (this.datosEstatus.comparacion) {
      case "pendiente":
        if (esFondo) {
          return "pendiente";
        } else {
          return "color__pendiente";
        }

      case "enproceso":
        if (esFondo) {
          return "en__proceso";
        }
        return "color__en__proceso";
      case "atrasado":
        if (esFondo) {
          return "atrasado";
        }
        return "color__atrasado";
      case "terminado":
        if (esFondo) {
          return "terminado";
        }
        return "color__terminado";

      default:
        if (esFondo) {
          return "sin__estatus";
        }
        return "color__sin__estatus";
    }
  }
}

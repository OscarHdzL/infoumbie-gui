import {
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from "@angular/core";
import { ListadoIndicadores } from "src/app/shared/model/seguimiento/AvanceSemanalMesaTrabajo";
import { AvanceSemanalMesaTrabajoService } from "src/app/shared/services/seguimiento/avance-semanal-mesa-trabajo.service";

@Component({
  selector: "app-tabla-indicadores",
  templateUrl: "./tabla-indicadores.component.html",
  styleUrls: ["./tabla-indicadores.component.css"],
})
export class TablaIndicadoresComponent implements OnInit, OnChanges, DoCheck {
  @Input() listadoIndicadores: ListadoIndicadores[] = [];
  @ViewChildren("unidades") listaUnidades: QueryList<ElementRef>;
  @ViewChildren("edicionUnidades") listaEdicionUnidades: QueryList<ElementRef>;
  @ViewChildren("inputUnidades") listaInputUnidades: QueryList<ElementRef>;

  @ViewChildren("asignado") listaAsignado: QueryList<ElementRef>;
  @ViewChildren("edicionAsignado") listaEdicionAsignado: QueryList<ElementRef>;
  @ViewChildren("inputAsignado") listaInputAsignado: QueryList<ElementRef>;

  @ViewChildren("piezas") listaPiezas: QueryList<ElementRef>;
  @ViewChildren("edicionPiezas") listaEdicionPiezas: QueryList<ElementRef>;
  @ViewChildren("inputPiezas") listaInputPiezas: QueryList<ElementRef>;

  @ViewChildren("nivel") listaNivel: QueryList<ElementRef>;
  @ViewChildren("edicionNivel") listaEdicionNivel: QueryList<ElementRef>;
  @ViewChildren("inputNivel") listaInputNivel: QueryList<ElementRef>;

  @ViewChildren("meta") listaMeta: QueryList<ElementRef>;
  @ViewChildren("edicionMeta") listaEdicionMeta: QueryList<ElementRef>;
  @ViewChildren("inputMeta") listaInputMeta: QueryList<ElementRef>;

  titulosIndicador: any = {};
  permiso: string = "";
  totalAcumulado: number = 0;
  totalAvance: number = 0;
  totalPorcentaje: number = 0;

  totalAcumuladoPersonal: number = 0;
  totalAvancePersonal: number = 0;
  totalPorcentajePersonal: number = 0;

  constructor(
    private renderer2: Renderer2,
    private mesaTrabajoService: AvanceSemanalMesaTrabajoService
  ) {}

  ngDoCheck(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listadoIndicadores.currentValue.length > 0) {
      console.log(
        "LISTADO INDICADORES: ",
        changes.listadoIndicadores.currentValue
      );
      this.calculaTotales();
    }
  }

  ngOnInit(): void {}

  calculaTotales() {
    this.totalAcumulado = 0;
    this.totalAvance = 0;
    this.totalPorcentaje = 0;
    this.totalAcumuladoPersonal = 0;
    this.totalAvancePersonal = 0;
    this.totalPorcentajePersonal = 0;
    this.listadoIndicadores.forEach((indicador, index) => {
      if (this.permiso === "CONS_INFRA") {
        this.totalAcumulado += indicador.numAcumulado;
        this.totalAvance += indicador.numAvance;
      }

      if (this.permiso === "RRHH") {
        if (index <= 3) {
          this.totalAcumulado += indicador.numAcumulado;
          this.totalAvance += indicador.numAvance;
        }

        if (index > 3) {
          this.totalAcumuladoPersonal += indicador.numAcumulado;
          this.totalAvancePersonal += indicador.numAvance;
        }
      }
    });
    if (this.permiso === "RRHH") {
      this.totalPorcentaje = this.calculaPorcentaje(
        this.totalAcumulado,
        this.totalAvance
      );
      this.totalPorcentajePersonal = this.calculaPorcentaje(
        this.totalAcumuladoPersonal,
        this.totalAvancePersonal
      );
    }
  }

  calculaPorcentaje(cantidad1: number = 0, cantidad2: number = 0): number {
    return Math.round((100 / cantidad1) * cantidad2);
  }

  agregaTitulos(titulos, permiso: string) {
    this.titulosIndicador = titulos;
    this.permiso = permiso;
  }

  muestraInputEdicion(elementRef: ElementRef, elementRefEdicion: ElementRef) {
    this.renderer2.addClass(elementRef.nativeElement, "hidden");
    this.renderer2.removeClass(elementRefEdicion.nativeElement, "hidden");
  }

  ocultaInputEdicion(elementRef: ElementRef, elementRefEdicion: ElementRef) {
    this.renderer2.removeClass(elementRef.nativeElement, "hidden");
    this.renderer2.addClass(elementRefEdicion.nativeElement, "hidden");
  }

  editarIndicador(index: number, tipo: string) {
    switch (tipo) {
      case "unidades":
        this.muestraInputEdicion(
          this.listaUnidades.toArray()[index],
          this.listaEdicionUnidades.toArray()[index]
        );
        break;
      case "asignado":
        this.muestraInputEdicion(
          this.listaAsignado.toArray()[index],
          this.listaEdicionAsignado.toArray()[index]
        );
        break;
      case "piezas":
        this.muestraInputEdicion(
          this.listaPiezas.toArray()[index],
          this.listaEdicionPiezas.toArray()[index]
        );
        break;
      case "meta":
        this.muestraInputEdicion(
          this.listaMeta.toArray()[index],
          this.listaEdicionMeta.toArray()[index]
        );
        break;
      case "nivel":
        this.muestraInputEdicion(
          this.listaNivel.toArray()[index],
          this.listaEdicionNivel.toArray()[index]
        );
        break;
    }
  }

  cancelarEdicionIndicador(index: number, tipo: string) {
    switch (tipo) {
      case "unidades":
        this.ocultaInputEdicion(
          this.listaUnidades.toArray()[index],
          this.listaEdicionUnidades.toArray()[index]
        );
        this.listaInputUnidades.toArray()[index].nativeElement.value = "";
        break;
      case "asignado":
        this.ocultaInputEdicion(
          this.listaAsignado.toArray()[index],
          this.listaEdicionAsignado.toArray()[index]
        );
        this.listaInputAsignado.toArray()[index].nativeElement.value = "";
        break;
      case "piezas":
        this.ocultaInputEdicion(
          this.listaPiezas.toArray()[index],
          this.listaEdicionPiezas.toArray()[index]
        );
        this.listaInputPiezas.toArray()[index].nativeElement.value = "";
        break;
      case "meta":
        this.ocultaInputEdicion(
          this.listaMeta.toArray()[index],
          this.listaEdicionMeta.toArray()[index]
        );
        this.listaInputMeta.toArray()[index].nativeElement.value = "";
        break;
      case "nivel":
        this.ocultaInputEdicion(
          this.listaNivel.toArray()[index],
          this.listaEdicionNivel.toArray()[index]
        );
        this.listaInputNivel.toArray()[index].nativeElement.value = "";
        break;
    }
  }

  confirmarEdicion(index: number, tipo: string) {
    let value: number = 0;
    switch (tipo) {
      case "unidades":
        value =
          this.listaInputUnidades.toArray()[index].nativeElement.value.length >
          0
            ? this.listaInputUnidades.toArray()[index].nativeElement.value
            : 0;

        // No permitir numeros negativos
        this.mesaTrabajoService.validaNumeroNegativo(value);
        // Valida formato del numero
        this.mesaTrabajoService.validaFormatoNumero(value);
        // Valida solo estrada de numeros enteros
        this.mesaTrabajoService.validaNumeroEntero(
          value,
          "Solo permiten números enteros."
        );

        this.listadoIndicadores[index].numAcumulado = value;
        this.ocultaInputEdicion(
          this.listaUnidades.toArray()[index],
          this.listaEdicionUnidades.toArray()[index]
        );
        break;
      case "asignado":
        value =
          this.listaInputAsignado.toArray()[index].nativeElement.value.length >
          0
            ? this.listaInputAsignado.toArray()[index].nativeElement.value
            : 0;

        // No permitir numeros negativos
        this.mesaTrabajoService.validaNumeroNegativo(value);
        // Valida formato del numero
        this.mesaTrabajoService.validaFormatoNumero(value);

        this.listadoIndicadores[index].numAvance = value;
        this.ocultaInputEdicion(
          this.listaAsignado.toArray()[index],
          this.listaEdicionAsignado.toArray()[index]
        );
        break;
      case "piezas":
        const indexIndicador: number = index === 0 ? index : 3;
        value =
          this.listaInputPiezas.toArray()[index].nativeElement.value.length > 0
            ? this.listaInputPiezas.toArray()[index].nativeElement.value
            : 0;
        // No permitir numeros negativos
        this.mesaTrabajoService.validaNumeroNegativo(value);
        // Valida formato del numero
        this.mesaTrabajoService.validaFormatoNumero(value);
        // Valida solo estrada de numeros enteros
        this.mesaTrabajoService.validaNumeroEntero(
          value,
          "Solo permiten números enteros."
        );

        this.listadoIndicadores[indexIndicador].numAcumulado = value;
        this.ocultaInputEdicion(
          this.listaPiezas.toArray()[index],
          this.listaEdicionPiezas.toArray()[index]
        );
        break;
      case "meta":
        value =
          this.listaInputMeta.toArray()[index].nativeElement.value.length > 0
            ? this.listaInputMeta.toArray()[index].nativeElement.value
            : 0;
        // No permitir numeros negativos
        this.mesaTrabajoService.validaNumeroNegativo(value);
        // Valida solo estrada de numeros enteros
        this.mesaTrabajoService.validaNumeroEntero(
          value,
          "Solo permiten números enteros."
        );

        this.listadoIndicadores[index].numAcumulado = value;
        this.ocultaInputEdicion(
          this.listaMeta.toArray()[index],
          this.listaEdicionMeta.toArray()[index]
        );
        break;
      case "nivel":
        value =
          this.listaInputNivel.toArray()[index].nativeElement.value.length > 0
            ? this.listaInputNivel.toArray()[index].nativeElement.value
            : 0;
        // No permitir numeros negativos
        this.mesaTrabajoService.validaNumeroNegativo(value);
        // Valida formato del numero
        this.mesaTrabajoService.validaFormatoNumero(value);

        this.listadoIndicadores[index + 1].numAcumulado = value;
        this.ocultaInputEdicion(
          this.listaNivel.toArray()[index],
          this.listaEdicionNivel.toArray()[index]
        );
        break;
    }
  }
}

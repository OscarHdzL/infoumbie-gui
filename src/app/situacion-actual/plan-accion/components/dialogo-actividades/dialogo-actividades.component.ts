import { Component, OnInit } from "@angular/core";
import {
  DetallePlanAcciones,
  Estatus,
} from "src/app/shared/model/situacion-actual/PlanAcciones";
import { PlanAccionesService } from "src/app/shared/services/situacion-actual/plan-acciones.service";

@Component({
  selector: "app-dialogo-actividades",
  templateUrl: "./dialogo-actividades.component.html",
  styleUrls: ["./dialogo-actividades.component.css"],
})
export class DialogoActividadesComponent implements OnInit {
  actividadesPorConcepto: DetallePlanAcciones[] = [];
  imagen: string = "";
  concepto: string = "";
  textoEstatus: string = "";
  numeroDatos: number[] = [5, 10, 15, 20];
  totalResultados: number = 0;
  paginaActual: number = 1;
  cantidadMostrar: number = 5;
  numeroDePaginas: number = 1;
  actividadesPorCantidad: DetallePlanAcciones[] = [];
  ordenamientoPorDefault: boolean = true;
  ordenamientoASC: boolean = false;
  ordenamientoDESC: boolean = false;
  columnaOrdenada: string = "";

  constructor(private planAccionesService: PlanAccionesService) {}

  ngOnInit(): void {
    this.obtenerActividades();
    this.cargaPaginaSeleccionada(this.paginaActual);
  }

  obtenerActividades() {
    this.concepto = localStorage.getItem("concepto");
    this.imagen = localStorage.getItem("imagen");
    this.actividadesPorConcepto = JSON.parse(
      localStorage.getItem("actividadesPorConcepto")
    );
    this.textoEstatus = localStorage.getItem("textoEstatus");
    if (Object.keys(this.actividadesPorConcepto).length <= 0) {
      this.actividadesPorConcepto = [];
      this.totalResultados = 0;
    }
  }

  // Obtiene total de numero de paginas
  obtenNumeroDePaginas(): number {
    return Math.ceil(this.actividadesPorConcepto.length / this.cantidadMostrar);
  }

  paginaAnterior() {
    if (this.actividadesPorCantidad.length > 0) {
      if (this.paginaActual > 1) {
        this.paginaActual--;
        this.cargaPaginaSeleccionada(this.paginaActual);
        this.limpiaOrdenamiento();
      }
    }
  }

  paginaSiguiente() {
    if (this.actividadesPorCantidad.length > 0) {
      if (this.paginaActual < this.obtenNumeroDePaginas()) {
        this.paginaActual++;
        this.cargaPaginaSeleccionada(this.paginaActual);
        this.limpiaOrdenamiento();
      }
    }
  }

  /**
   * @description Carga los datos de la pagina actual en el paginador
   * @param pagina Pagina actual en el paginador
   */
  cargaPaginaSeleccionada(pagina: number) {
    this.actividadesPorCantidad = [];
    if (this.actividadesPorConcepto.length > 0) {
      if (pagina < 1) {
        pagina = 1;
      }
      if (pagina > this.obtenNumeroDePaginas()) {
        pagina = this.obtenNumeroDePaginas();
      }
      this.numeroDePaginas = pagina;
      for (
        let i = (pagina - 1) * this.cantidadMostrar;
        i < pagina * this.cantidadMostrar;
        i++
      ) {
        if (i >= this.actividadesPorConcepto.length) {
          break;
        }
        this.actividadesPorCantidad.push(this.actividadesPorConcepto[i]);
      }
      this.totalResultados = this.actividadesPorCantidad.length;
    } else {
      this.numeroDePaginas = 0;
      this.totalResultados = 0;
    }
  }

  /**
   * @description Filtra los datos de acuerdo al tipo de visualizacion [5, 10, 15 , 20]
   * @param cantidad Cantidad seleccionada en visualizar datos
   */
  filtrarActividadesPorCantidad(cantidad: string) {
    if (this.actividadesPorCantidad.length > 0) {
      this.paginaActual = 1;
      this.cantidadMostrar = +cantidad;
      this.cargaPaginaSeleccionada(this.paginaActual);
      this.limpiaOrdenamiento();
    }
  }

  obtenClavesDeActividades(): string[] {
    return this.planAccionesService.obtenClavesDeActividades(
      this.actividadesPorCantidad
    );
  }

  /**
   * @description Ordenada los datos de acuerdo a la columna seleccionada
   * @param ordenarPor Columna seleccionada EJ: actividad
   * @param tipoOrdenamiento Tipo de ordenamiento: ASC o DESC
   * @param esFecha Valida si es de formato fecha la columna a ordenar.
   * Formato de fecha: recibida: DD/MM/YYYY 00:00
   */
  ordenar(
    ordenarPor: string,
    tipoOrdenamiento: string,
    esFecha: boolean = false,
    esNumero: boolean = false
  ) {
    if (this.actividadesPorCantidad.length > 0) {
      this.ordenarDatos(ordenarPor, tipoOrdenamiento, esFecha, esNumero);
      console.log("ORDENA POR: ", ordenarPor);
    }
  }

  /**
   * @description Ordena los datos con formato fecha
   * @param tipo [ASC, DESC] default ASC
   * @param ordenarPor
   */
  ordenarPorFecha(tipo: string, ordenarPor: string) {
    // Formatea fecha YYYY-MM-DD
    this.actividadesPorCantidad.map((actividad) => {
      if (actividad[ordenarPor].length > 0) {
        let fechaEnPartes: string[] = actividad[ordenarPor].split("/");
        let formatoYYYY_MM_DD: string = `${fechaEnPartes[2].substring(0, 4)}-${
          fechaEnPartes[1]
        }-${fechaEnPartes[0]}`;
        actividad[ordenarPor] = formatoYYYY_MM_DD;
      }else {
        actividad[ordenarPor] = "0000-00-00";
      }
    });

    // Ordena los datos
    if (tipo.toUpperCase().trim() === "ASC") {
      this.actividadesPorCantidad.sort((a, b): any => {
        return (
          new Date(a[ordenarPor]).getTime() - new Date(b[ordenarPor]).getTime()
        );
      });
    } else if (tipo.toUpperCase().trim() === " DESC") {
      this.actividadesPorCantidad.sort((a, b): any => {
        return (
          new Date(b[ordenarPor]).getTime() - new Date(a[ordenarPor]).getTime()
        );
      });
    } else {
      this.actividadesPorCantidad.sort((a, b): any => {
        return (
          new Date(a[ordenarPor]).getTime() - new Date(b[ordenarPor]).getTime()
        );
      });
    }

    // Formatea fecha DD/MM/YYYY
    this.actividadesPorCantidad.map((actividad) => {
      let fechaEnPartes: string[] = actividad[ordenarPor].split("-");
      let formatoDD_MM_YYYY: string = `${fechaEnPartes[2]}/${fechaEnPartes[1]}/${fechaEnPartes[0]}`;
      actividad[ordenarPor] = formatoDD_MM_YYYY;
    });
  }

  /**
   * @description Ordena los datos con formato estatus
   * @param tipo [ASC, DESC] default ASC
   */
  ordenarPorEstatus(tipo: string = " ASC") {
    this.actividadesPorCantidad.map((actividad) => {
      if (actividad.estatus.length > 0) {
        actividad.estatus = this.planAccionesService
        .obtenDatosEstatusPorEstatus(actividad.estatus)
        .ponderacion.toString();
      }else {
        actividad.estatus = "0"
      }
    });

    if (tipo.toUpperCase().trim() === "ASC") {
      this.actividadesPorCantidad.sort((a, b) => +a.estatus - +b.estatus);
    } else if (tipo.toUpperCase().trim() === "DESC") {
      this.actividadesPorCantidad.sort((a, b) => +b.estatus - +a.estatus);
    } else {
      this.actividadesPorCantidad.sort((a, b) => +a.estatus - +b.estatus);
    }

    this.actividadesPorCantidad.map((actividad) => {
      actividad.estatus =
        this.planAccionesService.obtenDatosEstatusPorPonderacion(
          +actividad.estatus
        ).nombre;
    });
  }

  ordenaASC(
    ordenarPor: string,
    esFecha: boolean = false,
    esNumero: boolean = false
  ) {
    this.ordenamientoDESC = false;
    this.ordenamientoASC = true;

    if (esFecha) {
      this.ordenarPorFecha("ASC", ordenarPor);
    }
    if (esNumero) {
      this.ordenarPorEstatus("ASC");
    } else {
      this.actividadesPorCantidad.sort((a, b): any => {
        return a[ordenarPor].localeCompare(b[ordenarPor], "fr", {
          ignorePunctuation: true,
        });
      });
    }
  }

  ordenaDESC(
    ordenarPor: string,
    esFecha: boolean = false,
    esNumero: boolean = false
  ) {
    this.ordenamientoDESC = true;
    this.ordenamientoASC = false;

    if (esFecha) {
      this.ordenarPorFecha("DESC", ordenarPor);
    }
    if (esNumero) {
      this.ordenarPorEstatus("DESC");
    } else {
      this.actividadesPorCantidad.sort((a, b): any => {
        return b[ordenarPor].localeCompare(a[ordenarPor], "fr", {
          ignorePunctuation: true,
        });
      });
    }
  }

  ordenarDatos(
    ordenarPor: string,
    tipoOrdenamiento: string = "ASC",
    esFecha: boolean = false,
    esNumero: boolean = false
  ) {
    const clavesEnActividades: string[] = this.obtenClavesDeActividades();
    if (clavesEnActividades.length > 0) {
      if (clavesEnActividades.includes(ordenarPor.trim())) {
        this.columnaOrdenada = "";
        this.columnaOrdenada = ordenarPor;
        this.ordenamientoPorDefault = false;
        if (tipoOrdenamiento.trim().toUpperCase() === "ASC") {
          this.ordenaASC(ordenarPor, esFecha, esNumero);
        } else if (tipoOrdenamiento.trim().toUpperCase() === "DESC") {
          this.ordenaDESC(ordenarPor, esFecha, esNumero);
        } else {
          this.ordenaASC(ordenarPor, esFecha, esNumero);
        }
      }
    }
  }

  // Resetea ordenamiento
  limpiaOrdenamiento() {
    this.ordenamientoPorDefault = true;
    this.ordenamientoASC = false;
    this.ordenamientoDESC = false;
    this.columnaOrdenada = "";
  }
}

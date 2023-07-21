import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CantidadYNecesidades,
  Conservacion,
  Equipo,
} from "src/app/shared/model/situacion-actual/Conservacion";
import { CluesService } from "src/app/shared/services/situacion-actual/clues.service";
import { ConservacionService } from "src/app/shared/services/situacion-actual/conservacion.service";
import { TablaConservacionesComponent } from "./components/tabla-conservaciones/tabla-conservaciones.component";

@Component({
  selector: "app-conservacion",
  templateUrl: "./conservacion.component.html",
  styleUrls: ["./conservacion.component.css"],
})
export class ConservacionComponent implements OnInit {
  clues: string = "0";
  cargando: boolean = false;
  tabEquipoMedico: boolean = true;
  tabElectromecanico: boolean = false;
  conservaciones: Conservacion = new Conservacion();
  totalGeneral: CantidadYNecesidades = new CantidadYNecesidades();
  datosConservaciones: Equipo[] = [];
  tipoEquipo: string = "medico";

  paginacionActual: number = 1;
  cantidadMostrar: number = 8;
  conservacionesHaMostrar: Equipo[] = [];
  paginasPaginacion: number[] = [];
  rangoPaginacion: number = 4;
  inicioRangoPaginacion: number = 0;
  finRangoPaginacion: number = 4;
  paginaActiva: number = 1;

  @ViewChild("equiposMedicos") tablaMedicos: TablaConservacionesComponent;
  @ViewChild("electromecanicos")
  tablaElectromecanicos: TablaConservacionesComponent;

  tipoFiltro: string = "";

  constructor(
    private conservacionService: ConservacionService,
    private cluesService: CluesService
  ) {}

  ngOnInit(): void {
    this.cluesService.getClues$().subscribe((clue) => {
      if (clue) {
        this.clues = clue.refClues;
        this.limpiaPaginacion();
        this.obtenConservaciones();
      }
    });
  }

  /*********************************************
   * Carga de datos, conservaciones
   ********************************************/

  obtenConservaciones() {
    this.cargando = true;
    this.conservacionService
      .obtenConservaciones(this.clues)
      .subscribe((resp) => {
        this.cargando = false;
        this.conservaciones = resp;
        this.agregaDatos(
          this.conservaciones.equipoMedico,
          this.conservaciones.totalEquipoMedico,
          this.tipoEquipo
        );
        this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
          this.inicioRangoPaginacion,
          this.finRangoPaginacion
        );
        this.cargaPaginaSeleccionada(this.paginaActiva);
      });
  }

  get totalConservaciones() {
    return Object.keys(this.conservaciones).length;
  }

  equipoMedico() {
    this.tipoEquipo = "medico";
    this.limpiaPaginacion();
    this.tablaMedicos.limpiarFiltro();
    this.agregaDatos(
      this.conservaciones.equipoMedico,
      this.conservaciones.totalEquipoMedico,
      this.tipoEquipo
    );
    this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
      this.inicioRangoPaginacion,
      this.finRangoPaginacion
    );
    this.cargaPaginaSeleccionada(this.paginaActiva);
  }

  electromecanico() {
    this.tipoEquipo = "electromecanico";
    this.limpiaPaginacion();
    this.tablaElectromecanicos.limpiarFiltro();
    this.agregaDatos(
      this.conservaciones.electromecanico,
      this.conservaciones.totalElectromecanico,
      this.tipoEquipo
    );
    this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
      this.inicioRangoPaginacion,
      this.finRangoPaginacion
    );
    this.cargaPaginaSeleccionada(this.paginaActiva);
  }

  agregaDatos(
    listadoDatos: Equipo[],
    totalGeneral: CantidadYNecesidades,
    tipo: string = "medico"
  ) {
    this.datosConservaciones = [];
    this.datosConservaciones = listadoDatos;
    if (tipo.trim() === "medico") {
      this.tabElectromecanico = false;
      this.tabEquipoMedico = true;
      this.totalGeneral = totalGeneral;
    } else if (tipo.trim() === "electromecanico") {
      this.tabElectromecanico = true;
      this.tabEquipoMedico = false;
      this.totalGeneral = totalGeneral;
    } else {
      this.tabElectromecanico = false;
      this.tabEquipoMedico = true;
      this.totalGeneral = totalGeneral;
    }
  }

  cargarDatosEquipo() {
    if (this.tipoEquipo.toLowerCase().trim() === "medico") {
      this.datosConservaciones = this.conservaciones.equipoMedico;
    } else if (this.tipoEquipo.toLowerCase().trim() === "electromecanico") {
      this.datosConservaciones = this.conservaciones.electromecanico;
    }
  }

  /*********************************************
   * Funciones paginacion
   ********************************************/

  /**
   * Obtiene el total de paginas
   * @returns
   */
  obtenNumeroDePaginas(): number {
    return Math.ceil(this.datosConservaciones.length / this.cantidadMostrar);
  }

  /**
   * Obtiene el rango de la paginacion
   * @returns
   */
  obtenRangoPaginacion(): number {
    return Math.ceil(this.obtenNumeroDePaginas() / this.rangoPaginacion);
  }

  /**
   * Configuracion inicial de la paginacion [1,2,3,4]
   * @returns
   */
  configuracionInicialPaginacion(): number[] {
    let paginas: number[] = [];
    for (let i = 0; i < this.obtenNumeroDePaginas(); i++) {
      paginas[i] = i + 1;
    }
    this.paginaActiva = paginas[0];
    return paginas;
  }

  /**
   * Carga los datos de la pagina seleccionada
   * @param pagina
   */
  cargaPaginaSeleccionada(pagina: number) {
    this.conservacionesHaMostrar = [];
    if (pagina < 1) {
      pagina = 1;
    }
    if (pagina > this.obtenNumeroDePaginas()) {
      pagina = this.obtenNumeroDePaginas();
    }
    for (
      let i = (pagina - 1) * this.cantidadMostrar;
      i < pagina * this.cantidadMostrar;
      i++
    ) {
      if (i >= this.datosConservaciones.length) {
        break;
      }
      this.conservacionesHaMostrar.push(this.datosConservaciones[i]);
    }
  }

  /**
   * Se mueve a la anterior paginacion [1,2,3,4] <- [5,6,7,8]
   */
  paginaAnterior() {
    if (this.conservacionesHaMostrar.length > 0) {
      if (this.paginacionActual > 1) {
        this.paginacionActual--;
        this.inicioRangoPaginacion -= this.rangoPaginacion;
        this.finRangoPaginacion -= this.rangoPaginacion;
        this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
          this.inicioRangoPaginacion,
          this.finRangoPaginacion
        );
        this.paginaActiva = this.paginasPaginacion[0];
        this.cargaPaginaSeleccionada(this.paginaActiva);
      }
    }
  }

  /**
   * Se mueve a la siguiente paginacion [1,2,3,4] -> [5,6,7,8]
   */
  paginaSiguiente() {
    if (this.conservacionesHaMostrar.length > 0) {
      if (this.paginacionActual < this.obtenRangoPaginacion()) {
        this.paginacionActual++;
        this.inicioRangoPaginacion += this.rangoPaginacion;
        this.finRangoPaginacion += this.rangoPaginacion;
        this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
          this.inicioRangoPaginacion,
          this.finRangoPaginacion
        );
        this.paginaActiva = this.paginasPaginacion[0];
        this.cargaPaginaSeleccionada(this.paginaActiva);
      }
    }
  }

  paginaSeleccionada(pagina: number) {
    this.paginaActiva = pagina;
    this.cargaPaginaSeleccionada(this.paginaActiva);
  }

  limpiaPaginacion() {
    this.paginaActiva = 1;
    this.paginacionActual = 1;
    this.inicioRangoPaginacion = 0;
    this.finRangoPaginacion = 4;
  }

  /*********************************************
   * Funciones filtro
   ********************************************/

  filtroSeleccionado($event) {
    this.tipoFiltro = "";
    this.tipoFiltro = $event;
    this.limpiaPaginacion();
    this.cargarDatosEquipo();
    switch ($event) {
      case "bueno":
        this.datosConservaciones = this.datosConservaciones.filter(
          ({ buenoCantidad, buenoNecesidades }) =>
            buenoCantidad > 0 || buenoNecesidades > 0
        );
        break;
      case "regular":
        this.datosConservaciones = this.datosConservaciones.filter(
          ({ regularCantidad, regularNecesidades }) =>
            regularCantidad > 0 || regularNecesidades > 0
        );
        break;
      case "critico":
        this.datosConservaciones = this.datosConservaciones.filter(
          ({ criticoCantidad, criticoNecesidades }) =>
            criticoCantidad > 0 || criticoNecesidades > 0
        );
        break;

      case "fueraServicio":
        this.datosConservaciones = this.datosConservaciones.filter(
          ({ fueraServicioCantidad, fueraServicioNecesidades }) =>
            fueraServicioCantidad > 0 || fueraServicioNecesidades > 0
        );
        break;

      case "noEspecificado":
        this.datosConservaciones = this.datosConservaciones.filter(
          ({ noEspecificadoCantidad, noEspecificadoNecesidades }) =>
            noEspecificadoCantidad > 0 || noEspecificadoNecesidades > 0
        );
        break;
    }

    this.paginasPaginacion = this.configuracionInicialPaginacion().slice(
      this.inicioRangoPaginacion,
      this.finRangoPaginacion
    );
    this.cargaPaginaSeleccionada(this.paginaActiva);
    this.totalCantidadNecesidadesPorFiltro(
      this.datosConservaciones,
      this.tipoFiltro
    );
  }

  totalCantidadNecesidadesPorFiltro(
    datosPorFiltro: Equipo[],
    tipoFiltro: string
  ) {
    if (tipoFiltro) {
      let totalCantidad: number = 0;
      let totalNececidades: number = 0;
      datosPorFiltro.map((equipo) => {
        totalCantidad += +equipo[`${tipoFiltro}Cantidad`];
        totalNececidades += +equipo[`${tipoFiltro}Necesidades`];
      });
      this.totalGeneral = {
        cantidad: totalCantidad,
        necesidades: totalNececidades,
      };
    } else {
      if (this.tipoEquipo.trim().toLowerCase() === "medico") {
        this.totalGeneral = this.conservaciones.totalEquipoMedico;
      } else {
        this.totalGeneral = this.conservaciones.totalElectromecanico;
      }
    }
  }
}

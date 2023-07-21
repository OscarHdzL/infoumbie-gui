import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  ActualizarIndicador,
  AvanceSemanal,
  AvanceSemanalComentario,
  Tab,
} from "src/app/shared/model/seguimiento/AvanceSemanalMesaTrabajo";
import { AvanceSemanalMesaTrabajoService } from "src/app/shared/services/seguimiento/avance-semanal-mesa-trabajo.service";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";

import { AlertService } from "../../shared/services/alert/alert.service";
import { FileUploadComponent } from "../components/file-upload/file-upload.component";
import { ArchivosService } from "src/app/shared/services/seguimiento/archivos.service";
import { MatDialog } from "@angular/material/dialog";
import { Entidad } from "../../shared/model/situacion-actual/Entidad";
import { Subscription } from "rxjs";
import { TablaIndicadoresComponent } from "../components/tabla-indicadores/tabla-indicadores.component";
import { AutenticacionService } from "src/app/shared/services/autenticacion/autenticacion.service";
declare var $: any;
import { SemanaPeriodoService } from "src/app/shared/services/seguimiento/semana-periodo.service";
import { AcordeonMesasTrabajoComponent } from "../components/acordeon-mesas-trabajo/acordeon-mesas-trabajo.component";

@Component({
  selector: "app-avance-semanal-mesa-trabajo",
  templateUrl: "./avance-semanal-mesa-trabajo.component.html",
  styleUrls: ["./avance-semanal-mesa-trabajo.component.css"],
})
export class AvanceSemanalMesaTrabajoComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild("menuTabs") menuTabs: ElementRef;
  @ViewChild("tabIzquierdo") botonIzquierdo: ElementRef;
  @ViewChild("tabDerecho") botonDerecho: ElementRef;
  @ViewChild("contenidoTabs") tabContenido: ElementRef;
  @ViewChildren("file") fileComponents: QueryList<FileUploadComponent>;
  @ViewChildren("indicador") indicadores: QueryList<TablaIndicadoresComponent>;
  @ViewChild("acordeon") acordeon: AcordeonMesasTrabajoComponent;

  public contador: number = 0;
  public menu: Tab[] = [];
  public idEstado: string = "";
  public contadorTab: number = 1;
  public tipoMesaSeleccionada: number = 0;
  public archivosPermitidos: number = 3;
  private estadosSubscription: Subscription;
  public avanceSemanalMesaTrabajo: AvanceSemanal;
  private semanaSubscription: Subscription;
  public numeroSemana: number = 0;
  private estadoSeleccionado: Entidad;

  constructor(
    private mesaTrabajoAS: AvanceSemanalMesaTrabajoService,
    private estadoService: EstadoService,
    private alertService: AlertService,
    private archivosService: ArchivosService,
    public dialog: MatDialog,
    private autenticacionService: AutenticacionService,
    private semanaPeriodoService: SemanaPeriodoService
  ) {}

  ngOnInit(): void {
    this.menu = this.mesaTrabajoAS.tiposMesasTrabajo;
  }

  ngAfterViewInit() {
    // DETECTA CAMBIO AL CABIAR DE ESTADO
    this.estadosSubscription = this.estadoService
      .getEstado$()
      .subscribe((estado) => {
        if (estado) {
          this.idEstado = estado.cveEntidad;
          this.estadoSeleccionado = estado;
          this.cargarInformacion();
          this.acordeon.idEstado = estado.cveEntidad;
        }
      });

    // DETECTA CAMBIO, EN EL NUMERO DE SEMANA
    this.semanaSubscription = this.semanaPeriodoService
      .getSemana$()
      .subscribe((semana) => {
        if (semana) {
          this.numeroSemana = semana.numSemana;
          this.cargarInformacion();
          this.acordeon.numeroSemana = semana.numSemana;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
    }
    if (this.semanaSubscription) {
      this.semanaSubscription.unsubscribe();
    }
  }

  private findArchivos(mesaTrabajo: Tab, estado: Entidad, index: number) {
    let avanceSemanalAux = new AvanceSemanalComentario();
    avanceSemanalAux.desSemana = this.numeroSemana.toString();
    avanceSemanalAux.cveEntidad = this.idEstado;
    avanceSemanalAux.cveTipoAvanceSemanal = mesaTrabajo.id.toString();

    console.log("AvanceSemanalCOmponent", this.fileComponents);
    console.log("AvanceSemanalCOmponent", estado.nomEntidad);

    this.fileComponents
      .toArray()
      [index].bloquea(
        "AvanceSemanalMesaTrabajoComponent_" +
          estado.nomEntidad +
          "_" +
          avanceSemanalAux.cveTipoAvanceSemanal
      );

    this.archivosService.obtenerArchivosMesaTrabajo(avanceSemanalAux).subscribe(
      (archivos) => {
        if (archivos) {
          this.fileComponents.toArray()[index].setFiles(archivos);
        } else {
          this.fileComponents.toArray()[index].setFiles(null);
        }
      },
      (error) => this.fileComponents.toArray()[index].setFiles(null)
    );
  }

  scrollIzquierdo() {
    if (this.contadorTab === 1) {
      this.contadorTab = 1;
    } else {
      this.contadorTab--;
    }

    this.menu.map((tab, index) => {
      this.menuTabs.nativeElement.childNodes[index].classList.remove(
        "tab-activo"
      );
      this.tabContenido.nativeElement.childNodes[index].classList.remove(
        "active"
      );
    });
    this.menuTabs.nativeElement.childNodes[this.contadorTab - 1].classList.add(
      "tab-activo"
    );
    this.tabContenido.nativeElement.childNodes[
      this.contadorTab - 1
    ].classList.add("active");
    this.menuTabs.nativeElement.scrollTo({
      left:
        this.menuTabs.nativeElement.scrollLeft -
        this.menuTabs.nativeElement.childNodes[this.contadorTab].clientWidth,
    });
    this.tipoMesaSeleccionada = this.contadorTab - 1;
  }

  scrollDerecho() {
    if (this.contadorTab < this.menu.length) {
      this.contadorTab++;
    } else {
      this.contadorTab = this.menu.length;
    }
    this.menu.map((tab, index) => {
      this.menuTabs.nativeElement.childNodes[index].classList.remove(
        "tab-activo"
      );
      this.tabContenido.nativeElement.childNodes[index].classList.remove(
        "active"
      );
    });
    this.menuTabs.nativeElement.childNodes[this.contadorTab - 1].classList.add(
      "tab-activo"
    );
    this.tabContenido.nativeElement.childNodes[
      this.contadorTab - 1
    ].classList.add("active");

    this.menuTabs.nativeElement.scrollTo({
      left:
        this.menuTabs.nativeElement.scrollLeft +
        this.menuTabs.nativeElement.childNodes[this.contadorTab - 2]
          .clientWidth,
    });
    this.tipoMesaSeleccionada = this.contadorTab - 1;
  }

  accionTab(comentario: string = "", index: number): void {
    this.contadorTab = index + 1;
    this.menu.map((tab, index) => {
      this.menuTabs.nativeElement.childNodes[index].classList.remove(
        "tab-activo"
      );
      this.tabContenido.nativeElement.childNodes[index].classList.remove(
        "active"
      );
    });
    this.menuTabs.nativeElement.childNodes[index].classList.add("tab-activo");
    this.tabContenido.nativeElement.childNodes[index].classList.add("active");
    this.contador = !comentario ? 0 : comentario.length;

    if (this.tipoMesaSeleccionada < index) {
      this.menuTabs.nativeElement.scrollTo({
        left:
          this.menuTabs.nativeElement.scrollLeft +
          this.menuTabs.nativeElement.childNodes[this.contadorTab - 2]
            .clientWidth,
      });
    }

    if (this.tipoMesaSeleccionada > index) {
      this.menuTabs.nativeElement.scrollTo({
        left:
          this.menuTabs.nativeElement.scrollLeft -
          this.menuTabs.nativeElement.childNodes[this.tipoMesaSeleccionada]
            .clientWidth,
      });
    }

    this.tipoMesaSeleccionada = index;
  }

  guardar(tab: Tab, index: number) {
    let avance: AvanceSemanalComentario = new AvanceSemanalComentario();
    avance.cveAvanceSemanal = tab.cveAvanceSemanal;
    avance.cveTipoAvanceSemanal = "" + tab.id;
    avance.desComentario =
      tab.comentario.trim().length === 0
        ? ""
        : encodeURIComponent(tab.comentario);
    avance.cveEntidad = this.idEstado;
    avance.desSemana = this.numeroSemana.toString();
    avance.cveUsuarioAlta = "";

    this.guardarIndicadores(tab, avance, index);
  }

  cancelar(idTipoMesa: number) {
    $(`#cancelado_${idTipoMesa}`).modal("show");
  }

  guardarIndicadores(tab: Tab, avance: AvanceSemanalComentario, index: number) {
    let datosIndicador: ActualizarIndicador = new ActualizarIndicador();
    const archivos: File[] = this.fileComponents.toArray()[index].getFiles();

    if (avance.desComentario.trim().length <= 0) {
      this.alertService.showAlertError("No puedes guardar campos vacíos.");
      return;
    }

    datosIndicador.cveEntidad = this.idEstado;
    datosIndicador.desSemana = this.numeroSemana.toString();
    datosIndicador.cveTipoAvanceSemanal = tab.id;
    datosIndicador.cveUsuarioAlta =
      this.autenticacionService.usuarioSesion.cveUsuario;
    datosIndicador.indicadores = [];

    if (this.indicadores.toArray()[index].listadoIndicadores.length > 0) {
      this.indicadores
        .toArray()
        [index].listadoIndicadores.forEach((indicador) => {
          datosIndicador.indicadores.push({
            numAvance:
              !indicador.numAvance ||
              indicador.numAvance.toString().length === 0
                ? 0
                : indicador.numAvance,
            numAcumulado:
              !indicador.numAcumulado ||
              indicador.numAcumulado.toString().length === 0
                ? 0
                : indicador.numAcumulado,
            porAvance:
              !indicador.porAvance ||
              indicador.porAvance.toString().length === 0
                ? 0
                : indicador.porAvance,
            cveIndicador: indicador.indicadorEstado.indicador.cveIndicador,
          });
        });

      /**
       * Reglas entrada de datos en indicadores
       * Medica: Numeros enteros
       * Conservacion: Unidades y % Avance (Numeros enteros) - Asignado (Enteros y decimales)
       * Equipamiento: Montos asignados (Enteros y decimales) - % Avance y Piezas (Enteros)
       * Personal: Numeros enteros
       * Abasto: Numeros enteros
       */
      if (datosIndicador.indicadores.length > 0) {
        datosIndicador.indicadores.forEach(
          ({ numAvance, numAcumulado, porAvance }) => {
            // No permitir numeros negativos
            this.mesaTrabajoAS.validaNumeroNegativo(numAvance);
            this.mesaTrabajoAS.validaNumeroNegativo(numAcumulado);
            this.mesaTrabajoAS.validaNumeroNegativo(porAvance);

            // Solo permitir entrada de numeros, valida formato
            this.mesaTrabajoAS.validaFormatoNumero(numAvance);
            this.mesaTrabajoAS.validaFormatoNumero(numAcumulado);
            this.mesaTrabajoAS.validaFormatoNumero(porAvance);

            // Reglas

            switch (tab.permiso) {
              case "MEDICA":
                this.mesaTrabajoAS.validaNumeroEntero(
                  porAvance,
                  "Solo permiten números enteros."
                );
                break;
              case "CONS_INFRA":
                this.mesaTrabajoAS.validaNumeroEntero(
                  porAvance,
                  "Solo permiten números enteros."
                );
                break;
              case "EQUIPAMIENTO":
                this.mesaTrabajoAS.validaNumeroEntero(
                  porAvance,
                  "Solo permiten números enteros."
                );
                break;
                break;
              case "RRHH":
                this.mesaTrabajoAS.validaNumeroEntero(
                  numAvance,
                  "Solo permiten números enteros."
                );
                break;
              case "ABASTO":
                this.mesaTrabajoAS.validaNumeroEntero(
                  porAvance,
                  "Solo permiten números enteros."
                );
                break;
            }
          }
        );
      }
      this.mesaTrabajoAS.actualizaIndicador(datosIndicador).subscribe(
        (resp) => {
          this.menu[index].listadoIndicadores = resp;
          this.indicadores.toArray()[index].calculaTotales();
          this.guardarComentarios(avance, index, archivos);
        },
        (error) => {
          this.alertService.showAlertError(
            "Ha ocurrido un error al actualizar indicadores."
          );
        }
      );
    } else {
      this.guardarComentarios(avance, index, archivos);
    }
  }

  guardarComentarios(
    avance: AvanceSemanalComentario,
    index: number,
    archivos: File[]
  ) {
    this.mesaTrabajoAS.guardaComentario(avance).subscribe(
      (response) => {
        this.archivosService
          .subirArchivosMesaTrabajo(archivos, avance)
          .subscribe(
            (resp) => {
              this.alertService.showAlertSuccess(
                "La información ha sido guardada exitosamente."
              );
            },
            (error) => {
              console.log(error);
              this.alertService.showAlertError(
                "Ha ocurrido un error al guardar archivos."
              );
            }
          );
      },
      (error) =>
        this.alertService.showAlertError(
          "Ha ocurrido un error al guardar comentarios."
        )
    );
  }

  cargarInformacion() {
    if (this.numeroSemana && this.numeroSemana > 0) {
      this.menu.forEach((m, index) => {
        this.mesaTrabajoAS
          .obtieneInformacionTipoAvance(
            this.numeroSemana.toString(),
            this.idEstado,
            m.id
          )
          .subscribe((avanceSemanal) => {
            console.log("Avance Semanal", avanceSemanal);
            this.avanceSemanalMesaTrabajo = avanceSemanal;
            m.comentario = !this.avanceSemanalMesaTrabajo.desComentario
              ? ""
              : avanceSemanal.desComentario.trim();
            m.cveAvanceSemanal = avanceSemanal.cveAvanceSemanal;
            this.contador = !m.comentario ? 0 : m.comentario.length;

            this.menuTabs.nativeElement.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            this.contadorTab = 1;
            this.menu.map((tab, index) => {
              this.menuTabs.nativeElement.childNodes[index].classList.remove(
                "tab-activo"
              );
              this.tabContenido.nativeElement.childNodes[
                index
              ].classList.remove("active");
            });
            this.menuTabs.nativeElement.childNodes[
              this.contadorTab - 1
            ].classList.add("tab-activo");
            this.tabContenido.nativeElement.childNodes[
              this.contadorTab - 1
            ].classList.add("active");
          });
        this.mesaTrabajoAS
          .obtenListadoIndicadores(
            this.idEstado,
            this.numeroSemana.toString(),
            m.id.toString()
          )
          .subscribe((indicadores) => {
            m.listadoIndicadores = indicadores;
          });
        this.indicadores
          .toArray()
          [index].agregaTitulos(m.titulosIndicadores, m.permiso);
        this.findArchivos(m, this.estadoSeleccionado, index);
      });
    }
  }

  /**
   * Elimina tildes o acentos de una cadena
   * @param cadena
   * @returns
   */
  limpiarCadena(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

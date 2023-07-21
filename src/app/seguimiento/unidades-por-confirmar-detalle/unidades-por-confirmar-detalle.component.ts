import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { Subscription } from "rxjs";
import {
  IUnidades,
  IUnidad,
} from "./../../shared/model/seguimiento/unidades";
import { Entidad } from "./../../shared/model/situacion-actual/Entidad";
import { EstadoService } from "./../../shared/services/seguimiento/estado.service";
import { MatPaginator } from "@angular/material/paginator";
import { NAVEGACION } from "src/app/shared/constants/navigation";
import { Router } from "@angular/router";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { UnidadesService } from "src/app/shared/services/seguimiento/unidades.service";
import { ModalCalendarioComponent } from "../consulta/componentes/modal-calendario/modal-calendario.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { UbicacionClue, Unidades } from 'src/app/shared/model/seguimiento/consultaUnidades';

@Component({
  selector: "app-unidades-por-confirmar-detalle",
  templateUrl: "./unidades-por-confirmar-detalle.component.html",
  styleUrls: ["./unidades-por-confirmar-detalle.component.css"],
})
export class UnidadesPorConfirmarDetalleComponent
  implements OnInit, AfterViewInit, OnDestroy
{

  private suscSerConsulta: Subscription;
  private subscUnidadGetEstado: Subscription;
  private subscUnidadGetUnidadesPorConfirmar: Subscription;
  private subscUnidadSubject: Subscription;
  private subscUnidadUnidadesConfirmarFecha: Subscription;
  displayedColumns: string[] = [
    "rowNum",
    "nomClue",
    "nomMunicipio",
    "ubicacion",
    "confirmacion",
    "fechaConfirmacion",
  ];
  dataSource = new MatTableDataSource<IUnidad>([]);
  textoBuscar: string = "";
  entidad: Entidad;
  unidadesResponse: IUnidades = {
    totalUnidades: 0,
    totalTransferidas: 0,
    totalConfirmadas: 0,
    totalUnidadesPorConfirmar: 0,
  };
  bodyRequest = {
    cveEntidad: "",
    nomClasificacion: "",
  };
  private cveClues: string = "";
  busquedaSinResultados: boolean = false;
  permiso: string = 'EDITAR_UNIDAD';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private modalDialogService: ModalDialogService,
    private servUnidades: UnidadesService,
    private servEstado: EstadoService,
    private alertService:AlertService,
    private spinner: NgxSpinnerService,
    private consultaService: ConsultaUnidadesService
  ) {}

  ngOnDestroy(): void {
    this.subscUnidadGetEstado.unsubscribe();
    if (this.subscUnidadGetUnidadesPorConfirmar)
      this.subscUnidadGetUnidadesPorConfirmar.unsubscribe();
    if (this.subscUnidadSubject) this.subscUnidadSubject.unsubscribe();
    if (this.subscUnidadUnidadesConfirmarFecha)
      this.subscUnidadUnidadesConfirmarFecha.unsubscribe();
    if(this.suscSerConsulta){
      this.suscSerConsulta.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.cargarEstado();
    this.eventoActualizarFecha();
  }

  cargarEstado(): void {
    this.bodyRequest.nomClasificacion =
      sessionStorage.getItem("PARAM_DESC_NIVEL");
    this.subscUnidadGetEstado = this.servEstado
      .getEstado$()
      .subscribe((entidad) => {
        if (entidad) {
          this.bodyRequest.cveEntidad = entidad.cveEntidad;
          this.cargarUnidades();
        }
      });
  }

  cargarUnidades(): void {
    this.subscUnidadGetUnidadesPorConfirmar = this.servUnidades
      .getUnidadesPorConfirmarDetalle(this.bodyRequest)
      .subscribe(
        (datos) => {
          this.unidadesResponse = datos;
          console.log('AQUIIIIIII: ',this.unidadesResponse)
          this.dataSource.data = datos.unidadesPorConfirmar;
          this.busquedaSinResultados = (datos.unidadesPorConfirmar.length<=0);
        },
        (err: any) => {
          console.log("Error al cargar las unidades por NIVEL:", err);
        }
      );
  }

  eventoActualizarFecha(): void {
    this.subscUnidadSubject = this.servUnidades
      .getSubjectFecha$()
      .subscribe((fecha) => {

        if (fecha) {
          this.dialog.closeAll();
          const body = {
            cveClues: this.cveClues,
            fechaUnidadPorConfirmar: fecha,
          };
          
          this.subscUnidadUnidadesConfirmarFecha = this.servUnidades
            .unidadesConfirmarFecha(body)
            .subscribe(
              (success) => {
                this.cargarUnidades();
                this.servUnidades.setSubjectFecha(null);
                this.alertService.showAlertSuccess("La información ha sido guardada exitosamente.")
              },
              (err: any) => {
                console.log("&#9760; Error al confirmar fecha unidad:", err);
                this.modalDialogService.showDialog('Atención', "Érror", 'Ocurrio un error al registrar la fecha', () => { });
              }
            );
        }

      });
  }

  atras() {
    this.router.navigate([NAVEGACION.seguimiento]);
  }

  btnFormLimpiar(): void {
    this.textoBuscar = "";
    this.dataSource.data = [...this.unidadesResponse.unidadesPorConfirmar];
  }

  btnFormBuscar(): void {
    const texto = this.textoBuscar.toLowerCase();
    this.dataSource.data = [...this.unidadesResponse.unidadesPorConfirmar].filter(
      (unid) => {
        if (unid.nomClue && unid.nomClue.toLowerCase().includes(texto))
          return true;
        if (
          unid.nomMunicipio &&
          unid.nomMunicipio.toLowerCase().includes(texto)
        )
          return true;
        if (
          unid.fechaConfirmacion &&
          unid.fechaConfirmacion.toLowerCase().includes(texto)
        )
          return true;
        return false;
      }
    );
  }
  
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    if (!searchValue || searchValue.length<=0) {
      this.dataSource.data = [...this.unidadesResponse.unidadesPorConfirmar];
    }
  }

  abrirCalendario(cveClue: string): void {
    this.cveClues = cveClue;
    let datos = {
      cveClue: cveClue,
      tipoNivel: "confirmar",
    };

    this.dialog.open(ModalCalendarioComponent, {
      width: "700px",
      autoFocus: false,
      data: datos,
      disableClose: true,
    });
  }

  public mostrarUbicacion(cveClue: number): void{
    if(cveClue === 0 || cveClue === null || cveClue === undefined ){
      this.alertService.showAlertError('No se reconoció la Clave de la Clue');
      return;
    }

    this.ubicacionClue(cveClue);
  }

  private ubicacionClue(cveClue: number){
    this.spinner.show();
    this.suscSerConsulta = this.consultaService.getUbicacionClue(cveClue)
    .subscribe((resp: UbicacionClue) => {
      if(resp){
        this.spinner.hide();
        //console.log("RESP UBICACION",resp);
        window.open(resp.urlLocalizacion, '_blank');
      }
    });
  }
}

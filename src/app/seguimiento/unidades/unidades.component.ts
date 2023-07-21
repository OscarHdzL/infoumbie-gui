import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NAVEGACION } from "src/app/shared/constants/navigation";
import { Parametros, UnidadConfirmada } from "src/app/shared/model/seguimiento/consultaUnidades";
import { ConsultaUnidadesService } from "src/app/shared/services/seguimiento/consulta-unidades.service";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";
import { ParamDetalleUnidadesService } from "src/app/shared/services/seguimiento/param-detalle-unidades.service";
import { SemanaPeriodoService } from "src/app/shared/services/seguimiento/semana-periodo.service";

@Component({
  selector: "app-unidades",
  templateUrl: "./unidades.component.html",
  styleUrls: ["./unidades.component.css"],
})
export class UnidadesComponent implements OnInit, OnDestroy, AfterViewInit {
  public centroSalud: UnidadConfirmada = new UnidadConfirmada();
  public hospitales: UnidadConfirmada = new UnidadConfirmada();
  public unemesuno: UnidadConfirmada = new UnidadConfirmada();
  public unemesdos: UnidadConfirmada = new UnidadConfirmada();
  public unidadmovil: UnidadConfirmada = new UnidadConfirmada();
  public totales: any = {};
  public cveEntidad: string = "";
  private nomEntidad: string = "";
  private estadosSubscription: Subscription;
  private semanaSubscription: Subscription;
  private subscObtenListadoUnidades: Subscription;
  public numeroSemana: number = 0;

  constructor(
    private router: Router,
    private consultaService: ConsultaUnidadesService,
    private estadoService: EstadoService,
    private parametrosConsultaService: ParamDetalleUnidadesService,
    private semanaPeriodoService: SemanaPeriodoService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.estadosSubscription = this.estadoService
      .getEstado$()
      .subscribe((estado) => {
        if (estado) {
          this.cveEntidad = estado.cveEntidad;
          this.nomEntidad = estado.nomEntidad;
          this.obtenListadoUnidades(this.cveEntidad, this.numeroSemana);
        }
      });

    this.semanaSubscription = this.semanaPeriodoService
      .getSemana$()
      .subscribe((semana) => {
        if (semana) {
          this.numeroSemana = semana.numSemana;
          this.obtenListadoUnidades(this.cveEntidad, this.numeroSemana);
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
    if(this.subscObtenListadoUnidades){
      this.subscObtenListadoUnidades.unsubscribe();
    }
  }

  public consulta(descripcionNivel: string) {
    /* let parametros: Parametros = {
      cveEntidad: this.cveEntidad,
      nomEntidad: this.nomEntidad,
      descripcion: descripcionNivel
    };*/

    this.router.navigate([NAVEGACION.consulta], {
      /*queryParams: {
        cveEntidad: this.cveEntidad,
        nomEntidad: this.nomEntidad,
        descripcion: descripcionNivel,
      },*/
    });

    //Enviamos parametros a observable
    // this.parametrosConsultaService.setParametros(parametros);
    localStorage.setItem("tipoUnidad", '2');
    localStorage.setItem("descNivel", descripcionNivel);
    
  }

  public totalUnidades(descripcionNivel: string) {
    this.router.navigate([NAVEGACION.totalUnidades], {
      queryParams: {
        cveEntidad: this.cveEntidad,
        nomEntidad: this.nomEntidad,
        descripcion: descripcionNivel,
      },
    });
  }

  public obtenListadoUnidades(cveEntidad: string, numeroSemana: number) {
    this.subscObtenListadoUnidades = this.consultaService
      .obtenListadoUnidades(cveEntidad, numeroSemana)
      .subscribe((unidades) => {
        console.log("UNIDADES: ", unidades);

        this.centroSalud = {
                    
          descripcion: unidades.descCentroSalud,
          unidadMeta: unidades.totalCentroSalud,
          conPresencia: unidades.totalTransferidasCentroSalud,
          porcentaje: unidades.porcentajeCentroSalud

        };
        this.hospitales = {
          
          descripcion: unidades.descHospitales,
          unidadMeta: unidades.totalHospitales,
          conPresencia: unidades.totalTransferidasHospitales,
          porcentaje: unidades.porcentajeHospitales

        };
        this.unemesuno = {
                    
          descripcion: unidades.descUnemesPrimerNivel,
          unidadMeta: unidades.totalUnemesPrimerNivel,
          conPresencia: unidades.totalTransferidasUnemesPrimerNivel,
          porcentaje: unidades.porcentajeUnemesPrimerNivel

        };
        this.unemesdos = {
                    
          descripcion: unidades.descUnemesSegundoNivel,
          unidadMeta: unidades.totalUnemesSegundoNivel,
          conPresencia: unidades.totalTransferidasUnemesSegundoNivel,
          porcentaje: unidades.porcentajeUnemesSegundoNivel

        };
        this.unidadmovil = {
                    
          descripcion: unidades.descUnidadesMoviles,
          unidadMeta: unidades.totalUnidadesMoviles,
          conPresencia: unidades.totalTransferidasUnidadesMoviles,
          porcentaje: unidades.porcentajeUnidadesMoviles

        };

        this.totales = {
                    
          unidadMeta: unidades.totalUnidades,
          conPresencia: unidades.totalTransferidas,
          porcentaje: unidades.porcentajeTotal

          /* unidades: unidades.totalUnidades,
          transferidasSemAnt: unidades.totalTransferidasSemanaAnt,
          porcentaje: unidades.porcentajeTotal,
          transferidasSemana: !unidades.totalTransferidasSemana
            ? 0
            : unidades.totalTransferidasSemana, */
        };
      });
  }
}

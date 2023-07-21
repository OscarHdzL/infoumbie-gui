import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { PeriodoSemanaService } from 'src/app/shared/services/seguimiento/periodo-semana.service';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { MesaEntregaModel, vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';

@Component({
  selector: 'app-mesa-entrega-recepcion-generico',
  templateUrl: './mesa-entrega-recepcion-generico.component.html',
  styleUrls: ['./mesa-entrega-recepcion-generico.component.css']
})
export class MesaEntregaRecepcionGenericoComponent implements OnInit {
  disabledBtn: boolean = false;
  private subscGetEstado: Subscription;
  private subscGetPeridosSemanas: Subscription;
  nombreMesa:any = 'Juridico';
  componente = 'MESA ENTREGA RECEPCIÓN';
  irAtras = NAVEGACION.avance_entrega_recepcion;
  mesaServiceSubscription$: Subscription;
  semanaServiceSubscription$: Subscription;

  mesaActualModel: vwMesaEntregaModel = new vwMesaEntregaModel();
  semanaActualModel: SemanaModel = new SemanaModel();
  acuerdoActualModel: AcuerdoModel = new AcuerdoModel();

  

  constructor(
    private router: Router,
    private estadoService: EstadoService,
    private periodo: PeriodoSemanaService,
    private route: ActivatedRoute,
    private mesaEntregaService: MesaEntregaService,
    private semanaService: SemanasService,
    private acuerdoService: AcuerdosService
  ) {
    
    this.route.params.subscribe(params => {
      this.nombreMesa = params['id']; // (+)  converts string 'id' to a number => +params['id']
   });


   this.mesaServiceSubscription$ = this.mesaEntregaService.getMesaEntregaActual().subscribe(
    (data) => {
      if(!data){
        this.router.navigate([this.irAtras]);
      }
      console.log("MesaActual" , data);
      this.mesaActualModel = data;
    });

    this.semanaServiceSubscription$ = this.semanaService.getSemana().subscribe(
      (data) => {
        console.log("SemanaActual" , data);
        this.semanaActualModel = data;
      });
  

  }


  public obtenerMesaEntrega(){

  }


  ngOnDestroy(): void {
    if (this.subscGetEstado) {
      this.subscGetEstado.unsubscribe();
    }
    if (this.subscGetPeridosSemanas) {
      this.subscGetPeridosSemanas.unsubscribe();
    }

    
    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }

    if (this.semanaServiceSubscription$) {
      this.semanaServiceSubscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    /* this.subscGetEstado = this.estadoService.getEstado$().subscribe(
      (entidad) => {
        if (entidad) {
          //this.disabledBtn = true;
          this.subscGetPeridosSemanas = this.periodo.getPeridosSemanas(entidad.nomEntidad).subscribe(
            (semanas) => {
              console.log(">>>>> getPeridosSemanas: avance-semanal-compt");  
              this.disabledBtn = !semanas;
            },
            (err: any) => {}
          );
        }
      },
      (err: any) => {}
    ); */
  }

  ngOnChanges(changes) {

  }

  public irPlanTrabajo() {
    if (!this.disabledBtn) {
      this.router.navigate([NAVEGACION.planTrabajo]);
    }
  }

  public receiveMessage(evento: boolean) {    
    if(evento){
       
    }
  }

  public clickModal(){
    
    this.acuerdoActualModel.id = 0;
    this.acuerdoActualModel.catMesaEntregaId = this.mesaActualModel.id;
    this.acuerdoActualModel.catSemanaId = this.semanaActualModel.id;
    this.acuerdoActualModel.catEstatusAcuerdoId = 1; //Nuevo
    this.acuerdoActualModel.fechaCreacion= new Date();
    this.acuerdoService.setAcuerdoActual(this.acuerdoActualModel);
  }

  
}

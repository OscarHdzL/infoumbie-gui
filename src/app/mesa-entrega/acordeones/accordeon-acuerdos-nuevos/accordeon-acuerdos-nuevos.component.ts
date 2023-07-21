import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ESTATUS_ACUERDO } from 'src/app/shared/constants/global';
import { AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';
import { vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-accordeon-acuerdos-nuevos',
  templateUrl: './accordeon-acuerdos-nuevos.component.html',
  styleUrls: ['./accordeon-acuerdos-nuevos.component.css']
})
export class AccordeonAcuerdosNuevosComponent implements OnInit {

  @Input()
  titulo: string = "";

  @Input()
  public open = false;
  listaAcuerdosAux = new Array<AcuerdoModel>();
  listaAcuerdos = new Array<AcuerdoModel>();
  totalRegistros = 1;
  modoEditarEntrega = false;
  modoEditarValidacion = false;
  mesaServiceSubscription$: Subscription;
  semanaServiceSubscription$: Subscription;
  mesaActualModel: vwMesaEntregaModel = new vwMesaEntregaModel();
  semanaActualModel: SemanaModel = new SemanaModel();
  constructor(
    private mesaEntregaService: MesaEntregaService,
    private semanaService: SemanasService,
    private acuerdoService: AcuerdosService,
    private alertService: AlertService,
  ) { 
    
  }

  ngOnInit(): void {
    this.mesaServiceSubscription$ = this.mesaEntregaService.getMesaEntregaActual().subscribe(
      (data) => {
        this.mesaActualModel = data;
        this.obtenerSemana();
      });
  }

  ngOnDestroy(): void {

    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }

    if (this.semanaServiceSubscription$) {
      this.semanaServiceSubscription$.unsubscribe();
    }
  }

  public obtenerSemana(){
    this.semanaServiceSubscription$ = this.semanaService.getSemana().subscribe(
      (data) => {
        console.log("SemanaActual" , data);
        this.semanaActualModel = data;
        this.obtenerAcuerdos();
      });
  }

  public obtenerAcuerdos(){
    this.acuerdoService.getAcuerdos(this.mesaActualModel.id, this.semanaActualModel.id).subscribe(
      (data) => {
        this.listaAcuerdosAux = [];
        this.listaAcuerdos = [];

        data.forEach((x)=>{
          this.listaAcuerdos.push(x.acuerdo)
        })

        this.listaAcuerdos = this.listaAcuerdos.filter(x=>x.catMesaEntregaId == this.mesaActualModel.id && x.catSemanaId == this.semanaActualModel.id && x.catEstatusAcuerdoId == ESTATUS_ACUERDO.NUEVO);
        this.listaAcuerdos.forEach((x)=>{
          x.edicionEntrega = false;
          x.edicionValidacion = false;
        });
      },
      (error)=> {
        
          console.log("Ocurrio error en consulta de acuerdos");  
          console.log(error);
          this.listaAcuerdos = [];
      });
  }


  public show() {
    console.log('ClickEvent');
    this.open = !this.open;
    console.log('Open', this.open);
  }

  public receiveMessage(evento: boolean) {    
    if(evento){
      
      this.obtenerAcuerdos()
    }
  }

  editarAcuerdo(acuerdo: AcuerdoModel){
    //cargar info del acuerdo en sesion o asi, y obtenerlo en el modal

    this.acuerdoService.setAcuerdoActual(acuerdo);
  }

  
  clickEditarEntregaAcuerdo(acuerdo: AcuerdoModel){
    acuerdo.edicionEntrega = true;
  }

  aceptarEdicionEntregaAcuerdo(acuerdo: AcuerdoModel){
    //acuerdo.edicionEntrega = false;
    this.guardarAcuerdo(acuerdo);
  }

  cancelarEdicionEntregaAcuerdo(acuerdo: AcuerdoModel){
    this.obtenerAcuerdos()
  }


  clickEditarValidacionAcuerdo(acuerdo: AcuerdoModel){
    acuerdo.edicionValidacion = true;
  }

  aceptarEdicionValidacionAcuerdo(acuerdo: AcuerdoModel){
    //acuerdo.edicionValidacion = false;
    this.guardarAcuerdo(acuerdo);
  }

  cancelarEdicionValidacionAcuerdo(acuerdo: AcuerdoModel){
    this.obtenerAcuerdos()
  }


  public guardarAcuerdo(acuerdo) {
    this.acuerdoService.guardarEditarAcuerdo(acuerdo).subscribe(
      (response: any) => {
        
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.obtenerAcuerdos();
      }
    );
  }

  public async enviarAcuerdosAActivo() {
    await this.listaAcuerdos.forEach((acuerdo)=>{
      acuerdo.catEstatusAcuerdoId = 2; //Activo
      this.acuerdoService.guardarEditarAcuerdo(acuerdo).subscribe(
        (response: any) => {
          this.alertService.showAlertSuccess("Guardado exitosamente.");
          this.obtenerAcuerdos();
        }
      );
    });

    this.mesaEntregaService.setMesaEntregaActual(this.mesaActualModel);
  }

  
  public async cancelarAcuerdo(acuerdo: AcuerdoModel){
    acuerdo.catEstatusAcuerdoId = 4; //Eliminado

    await this.acuerdoService.guardarEditarAcuerdo(acuerdo).subscribe(
      (response: any) => {
        
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.obtenerAcuerdos();
      }
    );

    this.mesaEntregaService.setMesaEntregaActual(this.mesaActualModel);
  }


  mesaChange(){
        
  }

}

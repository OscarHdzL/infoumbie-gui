import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ESTATUS_ACUERDO } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { AcuerdoAuxModel, AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';
import { vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-accordeon-acuerdos',
  templateUrl: './accordeon-acuerdos.component.html',
  styleUrls: ['./accordeon-acuerdos.component.css']
})
export class AccordeonAcuerdosComponent implements OnInit {
  @Input()
  idAcuerdo?: number = 0;

  @Input()
  idEstatus?: number = 0;

  @Input()
  nombreMesa?: string = "";

  @Input()
  titulo: string = "";

  @Input()
  public open = false;

  listaAcuerdosAux = new Array<AcuerdoModel>();
  listaAcuerdos = new Array<AcuerdoModel>();
  totalRegistros = 1;
  modoEditarEntrega = false;
  modoEditarValidacion = false;
  acuerdoActual: AcuerdoModel;
  mesaServiceSubscription$: Subscription;
  semanaServiceSubscription$: Subscription;
  mesaActualModel: vwMesaEntregaModel = new vwMesaEntregaModel();
  semanaActualModel: SemanaModel = new SemanaModel();

  TEXTO = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dicta rem fugiat numquam at maxime expedita voluptate fugit, culpa soluta, voluptatibus facere quo autem laudantium corporis molestiae? Voluptatem, temporibus pariatur. Lorem ipsum dolor  sit amet consectetur adipisicing elit. Adipisci reprehenderit expedita explicabo libero officia impedit nisi odio. Fuga velit rerum sit nisi corrupti earum temporibus, officia, eveniet voluptas aperiam sint. Lorem ipsum dolor sit amet consectetur   adipisicing elit. Nam delectus, facilis saepe placeat mollitia minima repudiandae dignissimos. Voluptatem doloremque deserunt suscipit, recusandae voluptas quia. At molestias laborum neque quos fugiat!'

  constructor(
    private mesaEntregaService: MesaEntregaService,
    private semanaService: SemanasService,
    private acuerdoService: AcuerdosService,
    private alertService: AlertService,
    private router: Router
  ) { 


  
    
  }
  ngOnInit(): void {





    this.mesaServiceSubscription$ = this.mesaEntregaService.getMesaEntregaActual().subscribe(
      (data) => {
         
        console.log('Mesa')
        this.mesaActualModel = data;
        this.obtenerSemana();
      });
    
    
  }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    /* debugger
    const btn = document.querySelector(".boton");
    const text = document.querySelector(".leer-mas");
    const wrapper = document.querySelector(".wrapper");

    btn.addEventListener("click", e => {
        text.classList.toggle("leer-mas_open");
        text.classList.contains("leer-mas_open") ? btn.innerHTML = "Leer Menos" : btn.innerHTML = "Leer Mas";
    }); */
  }
  

  


  public obtenerSemana(){
    this.semanaServiceSubscription$ = this.semanaService.getSemana().subscribe(
      (data) => {
         
        console.log('semana')
        console.log("SemanaActual" , data);
        this.semanaActualModel = data;
        this.obtenerAcuerdos();
      });
  }

  public async obtenerAcuerdos(){
    



    
   await this.acuerdoService.getAcuerdos(this.mesaActualModel.id, this.semanaActualModel.id).subscribe(
      (data) => {
        
        this.listaAcuerdosAux = [];
        this.listaAcuerdos = [];

       /*  data.forEach((x)=>{
          this.listaAcuerdos.push(x.acuerdo)
        }) */

        this.listaAcuerdos = data.filter(x=>x.catMesaEntregaId == this.mesaActualModel.id && x.catSemanaId == this.semanaActualModel.id && x.catEstatusAcuerdoId == this.idEstatus);
        this.listaAcuerdos.forEach((x)=>{
          x.edicionEntrega = false;
          x.edicionValidacion = false;
          x.mostrarMas = false;
        });
         //Para obtener el contador de acuerdos activos en otro componente
          

          if(this.idEstatus == ESTATUS_ACUERDO.ACTIVO ){
            this.acuerdoService.setContadorAcuerdosActivos(this.listaAcuerdos.length);
          }


      },
      (error)=> {
        
          console.log("Ocurrio error en consulta de acuerdos");  
          console.log(error);
          this.listaAcuerdos = [];

         //Para obtener el contador de acuerdos activos en otro componente
         

         if(this.idEstatus == ESTATUS_ACUERDO.ACTIVO ){
           this.acuerdoService.setContadorAcuerdosActivos(this.listaAcuerdos.length);
         }          
      });

   
    
  }


  public show() {
    console.log('ClickEvent');
    this.open = !this.open;
    console.log('Open', this.open);
  }

  ngOnDestroy(): void {

    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }

    if (this.semanaServiceSubscription$) {
      this.semanaServiceSubscription$.unsubscribe();
    }
  }

  irComentariosAcuerdo(acuerdo){
    
    this.acuerdoService.setAcuerdoActual(acuerdo);
    this.router.navigate([NAVEGACION.comentario_mesa_entrega+'/'+this.nombreMesa+'/'+acuerdo.id]);
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
  

  public async receiveMessageComentarioCancelacion(evento: boolean) {    
    if(evento){
  
       await this.acuerdoService.guardarEditarAcuerdo(this.acuerdoActual).subscribe(
        (response: any) => {
          
          this.alertService.showAlertSuccess("Guardado exitosamente.");
          this.obtenerAcuerdos();
        }
      );
      this.mesaEntregaService.setMesaEntregaActual(this.mesaActualModel);
    }
  }

  /* public async cancelarAcuerdo(acuerdo: AcuerdoModel){
    acuerdo.catEstatusAcuerdoId = 3; //Cancelado

    await this.acuerdoService.guardarEditarAcuerdo(acuerdo).subscribe(
      (response: any) => {
        
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.obtenerAcuerdos();
      }
    );
    
    this.mesaEntregaService.setMesaEntregaActual(this.mesaActualModel);
  }
 */

  public async cancelarAcuerdo(acuerdo: AcuerdoModel){
    
    acuerdo.catEstatusAcuerdoId = ESTATUS_ACUERDO.CANCELADO; //Cancelado
    this.acuerdoActual = acuerdo;
   this.acuerdoService.setAcuerdoActual(acuerdo);
  }

  public async verCancelacionAcuerdo(acuerdo: AcuerdoModel){
    
    acuerdo.catEstatusAcuerdoId = ESTATUS_ACUERDO.CANCELADO; //Cancelado
    this.acuerdoActual = acuerdo;
   this.acuerdoService.setAcuerdoActual(acuerdo);
  }
}

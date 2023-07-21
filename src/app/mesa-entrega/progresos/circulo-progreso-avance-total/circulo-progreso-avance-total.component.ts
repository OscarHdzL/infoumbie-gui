import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { vwMesaEntregaModel } from 'src/app/shared/model/MesaEntrega/MesaEntregaModel';
import { PorcentajeMesaModel } from 'src/app/shared/model/MesaEntrega/PorcentajeMesaModel';
import { SemanaModel } from 'src/app/shared/model/MesaEntrega/SemanaModel';
import { MesaEntregaService } from 'src/app/shared/services/MesaEntrega/mesa-entrega.service';
import { PorcentajesMesaService } from 'src/app/shared/services/MesaEntrega/porcentajes-mesa.service';
import { SemanasService } from 'src/app/shared/services/MesaEntrega/semanas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-circulo-progreso-avance-total',
  templateUrl: './circulo-progreso-avance-total.component.html',
  styleUrls: ['./circulo-progreso-avance-total.component.scss']
})
export class CirculoProgresoAvanceTotalComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() titulo: string = "";
  id: string = "3";

  public colorAzul = "#5094C3";
  public colorVerde = "#72985A";
  public colorAmarillo = "#FFD646";
  public colorNaranja = "#F88F32";
  public colorRojo = "#E1160B";
  mesaServiceSubscription$: Subscription;
  semanaServiceSubscription$: Subscription;

  mesaActualModel: vwMesaEntregaModel;
  semanaActualModel: SemanaModel;
  porcentajeMesaActual = new PorcentajeMesaModel();
  modoEditar = false;

  constructor(
    private mesaEntregaService: MesaEntregaService,
    private semanaService: SemanasService,
    private porcentajeMesaService: PorcentajesMesaService,
    private alertService: AlertService,
  ) {
    
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {

    if(this.mesaActualModel && this.semanaActualModel){
      
      this.porcentajeMesaService.getPorcentajeMesa(this.mesaActualModel.id, this.semanaActualModel.id).subscribe(
        (data) =>
        {
          this.porcentajeMesaActual = data;

          let scrollProgress1 = document.getElementById("progress" + this.id);
            if(this.porcentajeMesaActual.porcentajeGeneral >= 0 && this.porcentajeMesaActual.porcentajeGeneral<=25){
                scrollProgress1.style.background = `conic-gradient(${this.colorRojo} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 26 && this.porcentajeMesaActual.porcentajeGeneral<=50){
              scrollProgress1.style.background = `conic-gradient(${this.colorNaranja} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 51 && this.porcentajeMesaActual.porcentajeGeneral<=75){
              scrollProgress1.style.background = `conic-gradient(${this.colorAmarillo} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 76 && this.porcentajeMesaActual.porcentajeGeneral<=99){
              scrollProgress1.style.background = `conic-gradient(${this.colorVerde} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral == 100){
              scrollProgress1.style.background = `conic-gradient(${this.colorAzul} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;    
            }
      }, (error)=> {
        console.log('Ocurrio un error en la consulta de porcentaje entrega')
        console.log(error)
        this.porcentajeMesaActual = new PorcentajeMesaModel();
        let scrollProgress1 = document.getElementById("progress" + this.id);
        scrollProgress1.style.background = `conic-gradient(${this.colorRojo} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
      });
    }
     else { 
      let scrollProgress1 = document.getElementById("progress" + this.id);
      scrollProgress1.style.background = `conic-gradient(#e10000 ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
     }

    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.mesaServiceSubscription$ = this.mesaEntregaService
      .getMesaEntregaActual()
      .subscribe((data) => {
        
        console.log("MesaActual", data);
        this.mesaActualModel = data;
        this.loadData();
      });

    this.semanaServiceSubscription$ = this.semanaService
      .getSemana()
      .subscribe((data) => {
        
        console.log("SemanaActual", data);
        this.semanaActualModel = data;
        this.loadData();
      });
    
  }

  clickEditar() {
    this.modoEditar = true;
  }

  aceptar() {
    this.modoEditar = false;
  }

  cancelar() {
    this.modoEditar = false;
  }

  
  ngOnDestroy(): void {

    
    if (this.mesaServiceSubscription$) {
      this.mesaServiceSubscription$.unsubscribe();
    }

    if (this.semanaServiceSubscription$) {
      this.semanaServiceSubscription$.unsubscribe();
    }
  }


  changeModel(){
    
    console.log('porcentajeTotalEntrega', this.porcentajeMesaActual.porcentajeGeneral)
    if(this.porcentajeMesaActual.porcentajeGeneral>=0){
      let scrollProgress1 = document.getElementById("progress" + this.id);
            if(this.porcentajeMesaActual.porcentajeGeneral >= 0 && this.porcentajeMesaActual.porcentajeGeneral<=25){
                scrollProgress1.style.background = `conic-gradient(${this.colorRojo} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 26 && this.porcentajeMesaActual.porcentajeGeneral<=50){
              scrollProgress1.style.background = `conic-gradient(${this.colorNaranja} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 51 && this.porcentajeMesaActual.porcentajeGeneral<=75){
              scrollProgress1.style.background = `conic-gradient(${this.colorAmarillo} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral >= 76 && this.porcentajeMesaActual.porcentajeGeneral<=99){
              scrollProgress1.style.background = `conic-gradient(${this.colorVerde} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;
            } else if(this.porcentajeMesaActual.porcentajeGeneral == 100){
              scrollProgress1.style.background = `conic-gradient(${this.colorAzul} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;    
            }
            else if(this.porcentajeMesaActual.porcentajeGeneral > 100){
              this.porcentajeMesaActual.porcentajeGeneral = 100;
              scrollProgress1.style.background = `conic-gradient(${this.colorAzul} ${this.porcentajeMesaActual.porcentajeGeneral}%, #f2f2f4 ${this.porcentajeMesaActual.porcentajeGeneral}%)`;    
            }
    }

    
  }

  async guardarPorcentajeMesa(){
    
    this.porcentajeMesaActual.catSemanaId = this.semanaActualModel.id;
    this.porcentajeMesaActual.catMesaEntregaId = this.mesaActualModel.id;


    await this.porcentajeMesaService.guardarEditarPorcentajeMesa(this.porcentajeMesaActual).subscribe(
      (response)=>{
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.loadData();
        
        //Se genera como disparador para que se actualicen los componentes
        
      }
    );
    this.mesaEntregaService.setMesaEntregaActual(this.mesaActualModel);
    this.modoEditar = false;
  }
}

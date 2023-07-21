import {Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Comentarios, ResponseDetalleComentarios } from 'src/app/shared/model/seguimiento/comentarios';
import { PeriodoSemanal } from 'src/app/shared/model/seguimiento/periodo-semanal';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { ComentariosService } from 'src/app/shared/services/seguimiento/comentarios.service';
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';
import { EstadoService } from 'src/app/shared/services/seguimiento/estado.service';
import { PeriodoSemanaService } from 'src/app/shared/services/seguimiento/periodo-semana.service';


@Component({
  selector: 'app-comentarios-unidades',
  templateUrl: './comentarios-unidades.component.html',
  styleUrls: ['./comentarios-unidades.component.css']
})

export class ComentariosUnidadesComponent implements OnInit, OnDestroy  {
  listComentarios: Comentarios[] = []
  cveClue:number
  ocultaBtn: boolean = true
  activaNuevoComnt: boolean = false
  activaComponente: boolean = false
  nombreClue: string= ''
  desEstado: string= ''
  private ruta: string = '';
  loading: boolean = true;
  public cveEntidad: string;
  private descNivel: string = '';
  private nomEntidad: string = '';
  periodo: PeriodoSemanal;
  private subscServicePeriodo: Subscription;

  constructor(private router: Router, private comentariosService: ComentariosService, 
              private estadoService: EstadoService, private rutaActiva: ActivatedRoute,
              private modalDialogService: ModalDialogService, private servicePeriodo: PeriodoSemanaService,
              private consultaUnidadesService: ConsultaUnidadesService) { }

  ngOnInit(): void {

    this.estadoService.getEstado$().subscribe(data => {
      this.desEstado=data.nomEntidad;
      if (data) {
        this.btenerFechasPeriodo(data.nomEntidad);
        
      }
    });
    this.consultaUnidadesService.resetFormFiltros$().subscribe((data: any) => {
      console.log('🎈---🎈--🎈--Saber si se ha cambiado el estado',data);
      if(data){
        console.log('🎈---🎈--🎈cambioEstado ---- entre');
        this.cambioEstadoFilto(this.desEstado);

      }else{
        console.log('🎈---🎪--🎪cambioEstado ---- no entre');
      }
    })
    this.rutaActiva.queryParams
    .subscribe(parametros =>{
      
      this.nombreClue = parametros.nomClue
      this.cveClue = parametros.cveClue;
      this.cveEntidad = parametros.cveEntidad;
      this.nomEntidad = parametros.nomEntidad;
      this.descNivel = parametros.descNivel;
      this.ruta = parametros.ruta;
      this.consultaComentarios(parametros.cveClue)
    })


  }



  consultaComentarios(clue:number){
    //console.log('⛳',clue);
    
    this.comentariosService.getComentarios(clue).subscribe((response: ResponseDetalleComentarios[]) => {
     //console.log('respnse comentarios 🧨🧨🧨', response);
      if(response == undefined){
        this.loading = false;
      }
      this.listComentarios = response
      
      this.activaComponente = true
      //console.log('this.listComentarios 🧨🧨🧨', this.listComentarios);
    }, (err: any) => {
      this.loading = false;
      this.modalDialogService.showDialog('Atención', "Error", 'Ocurrió un error', () => { });
    })
  }

  nuevoComentario(){
    this.activaNuevoComnt = true
    this.ocultaBtn = false
  }

  valor(nuevoComentario: boolean){
    //console.log($event);
    if(nuevoComentario) {
      this.consultaComentarios(this.cveClue);
    }
      this.activaNuevoComnt = false
      this.ocultaBtn = true
    
  }

  public atras(): void{
    let navegacion: string = '';
    switch(this.ruta){
      case '1':
        navegacion = NAVEGACION.consulta;
      break;
      case '2':
        navegacion = NAVEGACION.totalUnidades;
        this.descNivel = 'todos';
      break;
    }

    this.router.navigate([navegacion], {
      /*queryParams: {
        cveEntidad: this.cveEntidad,
        nomEntidad: this.nomEntidad,
        descripcion: this.descNivel,
      }*/
    });
    
  }

  ngOnDestroy(): void {
    if (this.subscServicePeriodo) {
      this.subscServicePeriodo.unsubscribe();
    } 
  }

  btenerFechasPeriodo(clave: string) {
    this.periodo = new PeriodoSemanal();
    this.subscServicePeriodo = this.servicePeriodo
      .getPeridosSemanas(clave)
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.periodo = data[0];            
          }
        },
        (error: any) => {
          console.log("Error al cargar peridos:", error);
        }
      );
  }

  cambioEstadoFilto(clave: string){
    this.router.navigate([NAVEGACION.seguimiento],{ 
      queryParams: {
        estado:clave
      }
    })   
    this.consultaUnidadesService.setResetFormFiltros(false);  
  }

}
 
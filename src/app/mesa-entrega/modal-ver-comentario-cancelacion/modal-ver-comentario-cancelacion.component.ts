import { Comentario } from './../../shared/model/MesaEntrega/AcuerdoModel';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';
import { ComentarioAcuerdoModel } from 'src/app/shared/model/MesaEntrega/ComentarioAcuerdoModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { ComentarioAcuerdoService } from 'src/app/shared/services/MesaEntrega/comentario-acuerdo.service';

@Component({
  selector: 'app-modal-ver-comentario-cancelacion',
  templateUrl: './modal-ver-comentario-cancelacion.component.html',
  styleUrls: ['./modal-ver-comentario-cancelacion.component.css']
})
export class ModalVerComentarioCancelacionComponent implements OnInit {
  @ViewChild("closeModal") closeModal;
  @Input() entrada: any;
  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  infoArea: any;
  acuerdoServiceSubscription$: Subscription;
  acuerdoActualModel: AcuerdoModel = new AcuerdoModel();
  listaComentarios = new Array<ComentarioAcuerdoModel>();
  comentario = '';
  contadorCaracteresComentario = 0;

  constructor(
    
    private acuerdoService: AcuerdosService,
    private comentariosAcuerdoService: ComentarioAcuerdoService
  ) {
    this.acuerdoServiceSubscription$ = this.acuerdoService
      .getAcuerdoActual()
      .subscribe((data) => {
        
        if (data) {
          
          this.acuerdoActualModel = data;
        } else {
          this.acuerdoActualModel = new AcuerdoModel();
        }
        console.log("AcuerdoActual", data);
        this.obtenerComentarioCancelacion();
        /* this.llenarFormulario(); */
      });
  }

  ngOnInit(): void {

  }

  public obtenerComentarioCancelacion() {
    this.comentariosAcuerdoService.getComentarioAcuerdos(this.acuerdoActualModel.id).subscribe(
      (data) => {
        
        this.listaComentarios = data;
        let com = this.listaComentarios.filter((x) => x.cancelacion == 1)[0];
       this.comentario = com.comentario;
      },
      (error) => {
        
        console.log('Ocurrio un error en consulta de Comentarios');
        console.log(error);
        this.listaComentarios = [];
        this.comentario = '';
      }
    );
  }


  

  public close() {
    this.form.reset();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.acuerdoServiceSubscription$.unsubscribe();
  }
}

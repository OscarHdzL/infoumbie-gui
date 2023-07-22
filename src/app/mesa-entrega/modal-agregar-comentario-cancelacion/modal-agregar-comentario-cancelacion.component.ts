import { Comentario } from './../../shared/model/MesaEntrega/AcuerdoModel';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ESTATUS_ACUERDO } from 'src/app/shared/constants/global';
import { AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';
import { ComentarioAcuerdoModel } from 'src/app/shared/model/MesaEntrega/ComentarioAcuerdoModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { ComentarioAcuerdoService } from 'src/app/shared/services/MesaEntrega/comentario-acuerdo.service';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-modal-agregar-comentario-cancelacion',
  templateUrl: './modal-agregar-comentario-cancelacion.component.html',
  styleUrls: ['./modal-agregar-comentario-cancelacion.component.css']
})
export class ModalAgregarComentarioCancelacionComponent implements OnInit {
  @ViewChild("closeModal") closeModal;
  @Input() entrada: any;
  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  infoArea: any;
  acuerdoServiceSubscription$: Subscription;
  acuerdoActualModel: AcuerdoModel = new AcuerdoModel();

  contadorCaracteresComentario = 0;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
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
        this.crearFormulario();
        /* this.llenarFormulario(); */
      });
  }

  ngOnInit(): void {

  }

  public crearFormulario() {
    this.form = this.formBuilder.group({
      comentario: [null, Validators.compose([Validators.required])],
    });

    this.form.get('comentario').valueChanges.subscribe((x)=>{
      if(x){
        this.contadorCaracteresComentario = x.length;
      } else {
        this.contadorCaracteresComentario = 0;
      }
    });
  }

/*   public llenarFormulario() {
    
    this.form.patchValue(this.acuerdoActualModel);
  } */

  public close() {
    this.form.reset();
  }

  public guardarComentario(){
    
    let comentario = this.form.getRawValue();

    let objComentario = new ComentarioAcuerdoModel();
    objComentario.id = 0;
    objComentario.acuerdoId = this.acuerdoActualModel.id;
    objComentario.comentario = comentario.comentario;
    objComentario.fechaCreacion = new Date();
    objComentario.cancelacion = 1;

    this.comentariosAcuerdoService.guardarEditarComentarioAcuerdo(objComentario).subscribe(
      (response) => {
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.closeModal.nativeElement.click();
        this.messageEvent.emit(true);
        
      }, 
      (error) => {
        console.log('ocurrio un error al guardar');
        this.closeModal.nativeElement.click();
        this.messageEvent.emit(false);
        
      }
    );

  }

  




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.acuerdoServiceSubscription$.unsubscribe();
  }
}

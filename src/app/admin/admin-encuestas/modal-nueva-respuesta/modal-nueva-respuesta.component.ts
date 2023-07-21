import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-modal-nueva-respuesta',
  templateUrl: './modal-nueva-respuesta.component.html',
  styleUrls: ['./modal-nueva-respuesta.component.css']
})
export class ModalNuevaRespuestaComponent implements OnInit {

  @ViewChild('closeModal') closeModal;

  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(){
    this.form = this.formBuilder.group({
      respuesta: [null, Validators.compose([Validators.required])]
    });
  }

  public close(){
    this.form.reset();
  }

  public guardarRespuesta(){
    let respuesta = { 
      'cveRespuesta': null,
      'desRespuesta': this.form.get('respuesta').value,
    }

    this.adminEncuestasService.guardarNuevaRespuesta(respuesta).subscribe((response: any) => {
      this.spinner.hide();
      this.closeModal.nativeElement.click();
      this.messageEvent.emit(true);    
      this.form.reset();    
      this.alertService.showAlertSuccess('Guardado exitosamente.');
    }, (err: any) => {
      this.spinner.hide();
      this.closeModal.nativeElement.click();
      this.messageEvent.emit(false);
      this.form.reset();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

}

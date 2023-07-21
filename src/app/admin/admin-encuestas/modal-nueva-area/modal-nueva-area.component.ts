import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-modal-nueva-area',
  templateUrl: './modal-nueva-area.component.html',
  styleUrls: ['./modal-nueva-area.component.css']
})
export class ModalNuevaAreaComponent implements OnInit {
  
  @ViewChild('closeModal') closeModal;

  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  infoArea: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.adminEncuestasService.getDescripcion().subscribe(elem => {
      this.infoArea = elem;
      this.form.get('area').setValue(this.infoArea?.area?.desArea);
    }); 
  }

  private crearFormulario(){
    this.form = this.formBuilder.group({
      area: [null, Validators.compose([Validators.required])],
    });    
  }

  public close(){
    this.form.reset();
  }

  public guardarArea(){
    let area: any;
    if(this.infoArea?.edit){
      area = {
        cveArea: this.infoArea?.area?.cveArea,
        desArea: this.form.get("area").value,
        cveModulo: this.infoArea?.cveModulo,
        cveUsuario: this.infoArea?.cveUsuario      
      }
    }
    else{
      area = {
        desArea: this.form.get("area").value,
        cveModulo: this.infoArea?.cveModulo,
        cveUsuario: this.infoArea?.cveUsuario      
      }
    }

    this.adminEncuestasService.guardarEditarArea(area).subscribe((response: any) => {
      this.spinner.hide();
      this.closeModal.nativeElement.click();      
      this.messageEvent.emit(true);
      this.adminEncuestasService.setDescripcion(null);
      this.alertService.showAlertSuccess('Guardado exitosamente.');       
    }, (err: any) => {
      this.spinner.hide();
      this.closeModal.nativeElement.click(); 
      this.messageEvent.emit(true);
      this.adminEncuestasService.setDescripcion(null);
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });

    this.form.get("area").setValue('');
  }

}

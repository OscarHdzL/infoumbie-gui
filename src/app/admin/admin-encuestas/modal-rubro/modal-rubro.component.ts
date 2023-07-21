import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-modal-rubro',
  templateUrl: './modal-rubro.component.html',
  styleUrls: ['./modal-rubro.component.css']
})
export class ModalRubroComponent implements OnInit, AfterViewChecked {

  @ViewChild('closeModal') closeModal;

  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  listaAreas: [] = [];

  desRubro: string = '';
  rubro: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private autenticacionService: AutenticacionService,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
    ) { }

    ngAfterViewChecked(): void {      
      this.changeDetectorRef.detectChanges();
    } 

    ngOnInit(): void {
      this.crearFormulario();
      this.adminEncuestasService.getDescripcion().subscribe(elem => {
        this.rubro = elem;
        this.desRubro = elem?.rubro?.desRubro;   
        this.form.get('area').setValue(elem?.area);
      });      
            
    }
  
    private crearFormulario(){
      this.form = this.formBuilder.group({
        area: [{value: null, disabled: true}, Validators.compose([Validators.required])],
        rubro: [null, Validators.compose([Validators.required])],
      });
    }

    public close(){
      this.adminEncuestasService.setDescripcion(null);
      this.form.reset();
    }

    public guardarRubro(){
      let rubro: any;

      if(this.rubro.edit){
        rubro = {
          cveArea: this.rubro?.rubro.cveArea,
          cveRubro: this.rubro?.rubro.cveRubro,
          desRubro: this.form.get('rubro').value,
          cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario,
        }
      }
      else{
        rubro = {
          cveArea: this.rubro?.rubro.cveArea,
          desRubro: this.form.get('rubro').value,
          cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario,
        }
      }

      this.adminEncuestasService.guardarEditarRubro(rubro).subscribe((response: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click();
        this.adminEncuestasService.setDescripcion(null);        
        this.messageEvent.emit(true);        
        this.alertService.showAlertSuccess('Guardado exitosamente.');       
      }, (err: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click(); 
        this.adminEncuestasService.setDescripcion(null);        
        this.messageEvent.emit(false);
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });       
    }

}

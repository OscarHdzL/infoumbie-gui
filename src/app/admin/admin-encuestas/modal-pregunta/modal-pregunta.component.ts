import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
  styleUrls: ['./modal-pregunta.component.css']
})

export class ModalPreguntaComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('closeModal') closeModal;

  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  infoPregunta: any;
  listaTipoRespuestas: [] = [];
  listaRespuestas: any[] = [];
  desPregunta: string = '';
  tipoRespuesta: number;
  mostrarRespuestas: boolean = false;
  respuestasSeleccionadas: any[] = [];
  respuestas: any[] = [];
  seleccionar: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private autenticacionService: AutenticacionService,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
    ) { }

    ngAfterViewInit(): void {
      //this.obtenerCatalogoRespuestas(); 
    }
    
    ngAfterViewChecked(): void {
      this.changeDetectorRef.detectChanges();
    }  

    ngOnInit(): void {
      this.obtenerTiposRespuestas();   
      this.crearFormulario();      
      this.adminEncuestasService.getDescripcion().subscribe(elem => {
        this.infoPregunta = elem;       
        this.desPregunta = elem?.pregunta?.desPregunta;
        this.tipoRespuesta = elem?.pregunta?.cveTipoRespuestaPregunta;       
        this.respuestas = elem?.respuestas;
        this.form.get('area').setValue(elem?.area);
        this.form.get('rubro').setValue(elem?.desRubro);
      });      
    }
  
    private crearFormulario(){
      this.form = this.formBuilder.group({
        area: [{value: null, disabled: true}, Validators.compose([Validators.required])],
        rubro: [{value: null, disabled: true}, Validators.compose([Validators.required])],
        pregunta: [null, Validators.compose([Validators.required])],
        tipoRespuesta: [null, Validators.compose([Validators.required])],
        respuestas:[null, ],
      });      

      this.form.get('tipoRespuesta').valueChanges.subscribe(idRespuesta => {         
        if(idRespuesta === 1){      
          this.obtenerCatalogoRespuestas();   
          this.mostrarRespuestas = true;
          this.form.controls['respuestas'].setValidators([Validators.required]);
          this.form.controls['respuestas'].updateValueAndValidity();
        }
        else{
          this.mostrarRespuestas = false; 
          this.respuestasSeleccionadas = [];
          this.form.controls['respuestas'].setValidators(null);
          this.form.controls['respuestas'].updateValueAndValidity();
        }         
      });
    }

    private obtenerTiposRespuestas(){
      this.spinner.show();    
      this.adminEncuestasService.getTipoRespuestas().subscribe((response: any) => {
        this.spinner.hide();
        this.listaTipoRespuestas = response;  
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }

    private obtenerCatalogoRespuestas(){
      this.spinner.show();    
      this.adminEncuestasService.getCatalogoRespuestas().subscribe((response: any) => {
        this.spinner.hide();
        this.listaRespuestas = response;
      }, (err: any) => {
        this.spinner.hide();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }

    public close(){
      this.adminEncuestasService.setDescripcion(null);
      this.form.reset();
    }

    public crearArregloRespuestas(){        
      this.respuestasSeleccionadas = [];
      let item = this.form.get('respuestas').value;
      for (let i = 0; i <= item.length; i++) {
        this.listaRespuestas.forEach(elem => {
          if (item[i] == Number(elem.cveRespuesta)) {
            let respuesta = { 
              'cveRespuesta': elem.cveRespuesta,
              'desRespuesta': elem.desRespuesta
            };
            this.respuestasSeleccionadas.push(respuesta);
          }
        });     
      }      
    }

    public guardarPregunta(){      
      let pregunta: any;

      if(this.infoPregunta.edit){
        pregunta = {          
          cvePregunta: this.infoPregunta.pregunta.cvePregunta,
          desPregunta: this.form.get('pregunta').value,
          cveTipoRespuestaPregunta: this.form.get('tipoRespuesta').value,
          respuestas: this.respuestasSeleccionadas,
          cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario,
          cveRubro: this.infoPregunta.cveRubro,
        }        
      }
      else{
        pregunta = {
          desPregunta: this.form.get('pregunta').value,
          cveTipoRespuestaPregunta: this.form.get('tipoRespuesta').value,
          respuestas: this.respuestasSeleccionadas,
          cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario,
          cveRubro: this.infoPregunta.cveRubro,
        }
      }

      this.adminEncuestasService.guardarEditarPregunta(pregunta).subscribe((response: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click();
        this.adminEncuestasService.setDescripcion(null);
        this.messageEvent.emit(true);    
        this.form.reset();    
        this.alertService.showAlertSuccess('Guardado exitosamente.');
      }, (err: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click(); 
        this.adminEncuestasService.setDescripcion(null);
        this.messageEvent.emit(false);
        this.form.reset();
        this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });
    }

    public receiveMessage(evento: boolean) {    
      if(evento){
        this.obtenerCatalogoRespuestas();
      }
    }

}

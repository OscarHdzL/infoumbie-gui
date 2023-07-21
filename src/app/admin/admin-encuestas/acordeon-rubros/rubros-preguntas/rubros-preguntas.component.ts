import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-rubros-preguntas',
  templateUrl: './rubros-preguntas.component.html',
  styleUrls: ['./rubros-preguntas.component.css']
})
export class RubrosPreguntasComponent implements OnInit {

  @Input() pregunta: any;
  @Input() area: any;
  @Input() rubro: any;

  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;

  title: string;
  state: boolean = false;
  text: string;
  elem: any;
  respuestas: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private adminEncuestasService: AdminEncuestasService,
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {    
    this.form = this.formBuilder.group({
      pregunta: [this.pregunta.desPregunta],
    });    
  }

  public editarPregunta(pregunta: any){
    this.respuestas = [];
    this.adminEncuestasService.getConsultarRespuestasPregunta(pregunta?.cvePregunta).subscribe((response: any) => {
      this.spinner.hide();
      this.respuestas = response.respuestas.map(elem => {
        return elem.cveRespuesta
      });
      
      let infoPregunta = {
        title: 'Editar pregunta',
        edit: true,
        area: this.area.desArea,
        cveRubro: this.rubro.cveRubro,
        desRubro: this.rubro.desRubro,
        pregunta: pregunta,
        respuestas: this.respuestas
      }
      this.adminEncuestasService.setDescripcion(infoPregunta);

    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });    
  } 
  
  public eliminarPregunta(pregunta: any){
    this.adminEncuestasService.eliminarPregunta(pregunta.cvePregunta).subscribe((response: any) => {
      this.spinner.hide();  
      this.messageEvent.emit(true);
      this.adminEncuestasService.setDescripcion(null);
      this.alertService.showAlertSuccess('Eliminado exitosamente.');       
    }, (err: any) => {
      this.spinner.hide();
      this.messageEvent.emit(true);
      this.adminEncuestasService.setDescripcion(null);
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

}

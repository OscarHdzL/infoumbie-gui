import {
    Component,
    OnInit,
    Input,
    Output,
    SimpleChanges,
    EventEmitter,
    ViewChildren,
    QueryList,
    ViewChild, AfterViewInit, OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MENSAJES_NEGOCIO } from 'src/app/shared/constants/global';
import {EstatusEntidadFederativa} from 'src/app/shared/model/estatus-entidad-federativa/estatus-entidad-federativa';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { EstatusEntidadFederativaService } from 'src/app/shared/services/seguimiento/estatus-semanal.service';
import {EstadoService} from "../../shared/services/seguimiento/estado.service";
import { GaleriaSeguimientoComponent } from '../galeria-seguimiento/galeria-seguimiento.component';
import {FileUploadComponent} from "../components/file-upload/file-upload.component";
import {ArchivosService} from "../../shared/services/seguimiento/archivos.service";
import {Subscription} from "rxjs";
import {SemanaPeriodoService} from "../../shared/services/seguimiento/semana-periodo.service";
import { AcordeonEntidadFederativaComponent } from '../components/acordeon-entidad-federativa/acordeon-entidad-federativa.component';
declare var $: any;

@Component({
  selector: 'app-estatus-semanal',
  templateUrl: './estatus-semanal.component.html',
  styleUrls: ['./estatus-semanal.component.css']
})
export class EstatusSemanalComponent implements OnInit, AfterViewInit, OnDestroy {

  contadorComent = 0;
  contadorRiesgo = 0;
  contadorActividades = 0;
  formulario: FormGroup;
  validarFormulario: boolean = false;
  request:EstatusEntidadFederativa={};
  public idEstado: string = "";
  public semana: number=0;
  public estatusSemanalEntidadFederativa: EstatusEntidadFederativa;

  @ViewChild("fileEstatusSem") fileComponent: FileUploadComponent;
  @ViewChild("acordeon") acordeon: AcordeonEntidadFederativaComponent;

  @Input()
  banderaGuardar;

  @Output() cerrar = new EventEmitter<boolean>();

  private estadoSubscription: Subscription;
  private semanaSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private estatusEntidadFederativaService: EstatusEntidadFederativaService,
    private estadoService: EstadoService,
    private estatusSemanalEntidadFederativaService: EstatusEntidadFederativaService,
    private alertService:AlertService, private modalDialogService: ModalDialogService,
    private dialog: MatDialog, private archivosService: ArchivosService,
    private semanaService: SemanaPeriodoService) {
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

    ngAfterViewInit(): void {
        this.estadoSubscription = this.estadoService.getEstado$().subscribe(estado => {
          this.semanaSubscription = this.semanaService.getSemana$().subscribe(semana => {
            if (estado && semana) {
              this.semana = semana.numSemana;
              this.idEstado = estado.cveEntidad;
              this.obtenEstatusSemanalEntidadFederativa(this.semana,estado.cveEntidad);
              this.fileComponent.bloquea('Estatus Semanal');
              this.archivosService.obtenerArchivosEstatusSemanal(this.semana, this.idEstado).subscribe(archivos => {
                  console.log('Archivos de Estatus Semanal', archivos);
                  this.fileComponent.setFiles(archivos);
              }, error => this.fileComponent.desbloquea());
            }
        });
      });
    }

    ngOnDestroy(): void {
      if (this.estadoSubscription) {
          this.estadoSubscription.unsubscribe();
      }
      if (this.semanaSubscription) {
        this.semanaSubscription.unsubscribe();
      }
    }


  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      comentario: [null, Validators.compose([Validators.required])],
      riesgo: [null, Validators.compose([Validators.required])],
      actividades: [null, Validators.compose([Validators.required])]
    });
  }

  get form() {
    return this.formulario.controls;
  }

  get mensaje() { return MENSAJES_NEGOCIO; }

  onKeyComent(event) {
    this.contadorComent = event.target.value.length
  }

  onKeyRiesgo(event) {
    this.contadorRiesgo = event.target.value.length
  }

  onKeyActividades(event) {
    this.contadorActividades = event.target.value.length
  }

  public guardarComentario(){
    this.request={};
    this.validarFormulario = true;
   //if (!this.formulario.invalid) {
        if(
          this.formulario.controls['comentario'].value && this.formulario.controls['comentario'].value.trim().length>0  
          //this.formulario.controls['riesgo'].value && this.formulario.controls['riesgo'].value.trim().length>0 &&
          //this.formulario.controls['actividades'].value && this.formulario.controls['actividades'].value.trim().length>0
        ){
        // const files:File[] = this.fileComponent.getFiles();
        // if (files && files.length > 0) {
        this.request.desComentario=this.formulario.controls['comentario'].value!=null?this.formulario.controls['comentario'].value.trim():'';
        this.request.desRiesgo=this.formulario.controls['riesgo'].value!=null?this.formulario.controls['riesgo'].value.trim():'';
        this.request.desActividadesSigSemana=this.formulario.controls['actividades'].value!=null?this.formulario.controls['actividades'].value.trim():'';
        this.request.cveUsuarioAlta = this.autenticacionService.usuarioSesion.cveUsuario;
        this.request.desSemana = this.semana.toString();
        this.request.cveEntidad = this.idEstado;
        return this.estatusEntidadFederativaService.postGuardarComentario(this.request)
        .subscribe((response: any) => {
          const files:File[] = this.fileComponent.getFiles();
          if (files) {
                this.archivosService.subirArchivosEstatusSemanal(files, this.semana, this.idEstado).subscribe(response => {
                    this.alertService.showAlertSuccess("La información ha sido guardada exitosamente.")
                    this.formulario.controls['comentario'].setValue(this.formulario.controls['comentario'].value.trim());
                    this.formulario.controls['riesgo'].setValue(this.formulario.controls['riesgo'].value.trim());
                    this.formulario.controls['actividades'].setValue(this.formulario.controls['actividades'].value.trim());
                    this.contadorComent=this.formulario.controls['comentario'].value.trim().length;
                    this.contadorRiesgo=this.formulario.controls['riesgo'].value.trim().length;
                    this.contadorActividades=this.formulario.controls['actividades'].value.trim().length;
                }, error => this.alertService.showAlertError("Ha ocurrido un error alguardar los archivos de estatus semanal."))
              }
              else {
                this.formulario.controls['comentario'].setValue(this.formulario.controls['comentario'].value.trim());
                this.formulario.controls['riesgo'].setValue(this.formulario.controls['riesgo'].value.trim());
                this.formulario.controls['actividades'].setValue(this.formulario.controls['actividades'].value.trim());
                this.contadorComent=this.formulario.controls['comentario'].value.trim().length;
                this.contadorRiesgo=this.formulario.controls['riesgo'].value.trim().length;
                this.contadorActividades=this.formulario.controls['actividades'].value.trim().length;
                this.alertService.showAlertSuccess("La información ha sido guardada exitosamente.")
              }
        /*this.cerrar.emit(false);
        this.formulario.reset();
        this.validarFormulario=false;
        this.contadorComent=0;
        this.contadorRiesgo=0;
      this.spinner.hide();
      window.scroll(0,0);*/
      //this.getCuestionario();
      }, (err: any) => {
          /*this.cerrar.emit(false);
          this.formulario.reset();
          this.validarFormulario=false;
          this.contadorComent=0;
          this.contadorRiesgo=0;*/
        //this.spinner.hide();
        //this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
      });

          // }else {
          //   this.alertService.showAlertError('Favor de completar los campos obligatorios.');
          //   this.formulario.controls['comentario'].setValue(this.formulario.controls['comentario'].value.trim());
          //   this.formulario.controls['riesgo'].setValue(this.formulario.controls['riesgo'].value.trim());
          //   this.formulario.controls['actividades'].setValue(this.formulario.controls['actividades'].value.trim());
          //   this.contadorComent=this.formulario.controls['comentario'].value.trim().length;
          //   this.contadorRiesgo=this.formulario.controls['riesgo'].value.trim().length;
          //   this.contadorActividades=this.formulario.controls['actividades'].value.trim().length;
          // }
      }else{
        this.alertService.showAlertError('Favor de completar los campos obligatorios.');
        this.formulario.controls['comentario'].setValue(this.formulario.controls['comentario'].value.trim());
        this.formulario.controls['riesgo'].setValue(this.formulario.controls['riesgo'].value.trim());
        this.formulario.controls['actividades'].setValue(this.formulario.controls['actividades'].value.trim());
        this.contadorComent=this.formulario.controls['comentario'].value.trim().length;
        this.contadorRiesgo=this.formulario.controls['riesgo'].value.trim().length;
        this.contadorActividades=this.formulario.controls['actividades'].value.trim().length;
      }
    /*}else{
      this.alertService.showAlertError('No puedes guardar campos vacíos.');
      this.formulario.controls['comentario'].setValue('');
      this.formulario.controls['riesgo'].setValue('');
      this.contadorComent=0;
      this.contadorRiesgo=0;
    }*/
  }

  //cancelar() {
  //  this.modalDialogService.showDialog('Atención', "Atención", 'No existen datos para la consulta.', () => { });
  //}

  cancelar() {
    $(`#cancelado`).modal("show");
  }

  /*ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) { 
      if(propName==='banderaGuardar'){ 
        let change = changes[propName];
        if(change.currentValue){
          this.guardarComentario();
        }
      }
    }
    
 }*/

 obtenEstatusSemanalEntidadFederativa(semana: number,idEstado: string) {
  this.estatusSemanalEntidadFederativaService
    .getEstatusSemanal(semana, idEstado)
    .subscribe((response) => {
      if(response){
        this.estatusSemanalEntidadFederativa = response[0];
        this.formulario.controls['comentario'].setValue(this.estatusSemanalEntidadFederativa?.desComentario);
        this.formulario.controls['riesgo'].setValue(this.estatusSemanalEntidadFederativa?.desRiesgo);
        this.formulario.controls['actividades'].setValue(this.estatusSemanalEntidadFederativa?.desActividadesSigSemana);
        this.contadorComent=this.estatusSemanalEntidadFederativa?.desComentario!=null?this.estatusSemanalEntidadFederativa?.desComentario.length:0;
        this.contadorRiesgo=this.estatusSemanalEntidadFederativa?.desRiesgo!=null?this.estatusSemanalEntidadFederativa?.desRiesgo.length:0;
        this.contadorActividades=this.estatusSemanalEntidadFederativa?.desActividadesSigSemana!=null?this.estatusSemanalEntidadFederativa?.desActividadesSigSemana.length:0;
      }
      if(!response){
        this.estatusSemanalEntidadFederativa = {};
        this.formulario.controls['comentario'].setValue(this.estatusSemanalEntidadFederativa?.desComentario);
        this.formulario.controls['riesgo'].setValue(this.estatusSemanalEntidadFederativa?.desRiesgo);
        this.formulario.controls['actividades'].setValue(this.estatusSemanalEntidadFederativa?.desActividadesSigSemana);
        this.contadorComent=0;
        this.contadorRiesgo=0;
        this.contadorActividades=0;
      }
    }, error => {
      this.estatusSemanalEntidadFederativa = {};
    });
}

limpiaContador($event) {
        this.contadorComent=$event;
        this.contadorRiesgo=$event;
        this.contadorActividades=$event;
        this.formulario.controls['comentario'].setValue('');
        this.formulario.controls['riesgo'].setValue('');
        this.formulario.controls['actividades'].setValue('');
}

}

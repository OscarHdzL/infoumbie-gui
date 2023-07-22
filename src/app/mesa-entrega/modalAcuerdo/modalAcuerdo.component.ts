import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

import { MENSAJES_ERROR } from "src/app/shared/constants/global";
import { AcuerdoModel } from "src/app/shared/model/MesaEntrega/AcuerdoModel";
import { AcuerdosService } from "src/app/shared/services/MesaEntrega/acuerdos.service";
import { AdminEncuestasService } from "src/app/shared/services/admin-encuestas/admin-encuestas.service";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { ModalDialogService } from "src/app/shared/services/common/modal-dialog.service";

@Component({
  selector: "app-modalAcuerdo",
  templateUrl: "./modalAcuerdo.component.html",
  styleUrls: ["./modalAcuerdo.component.scss"],
})
export class ModalAcuerdoComponent implements OnInit {
  @ViewChild("closeModal") closeModal;
  @Input() entrada: any;
  @Output() messageEvent = new EventEmitter<boolean>();

  form: FormGroup;
  infoArea: any;
  acuerdoServiceSubscription$: Subscription;
  acuerdoActualModel: AcuerdoModel = new AcuerdoModel();

  contadorCaracteresTitulo = 0;
  contadorCaracteresDetalle = 0;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private adminEncuestasService: AdminEncuestasService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
    private acuerdoService: AcuerdosService
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
        this.llenarFormulario();
      });
  }

  ngOnInit(): void {

  }

  public crearFormulario() {
    /*     this.form = this.formBuilder.group({
      titulo: [null, Validators.compose([Validators.required])],
      detalle: [null, Validators.compose([Validators.required])],
      pentrega: [null, Validators.compose([Validators.required])],
      pvalidacion: [null, Validators.compose([Validators.required])]
    });     */

    this.form = this.formBuilder.group({
      id: [null],
      catMesaEntregaId: [null],
      catSemanaId: [null],
      catEstatusAcuerdoId: [null],
      titulo: [null, Validators.compose([Validators.required])],
      detalle: [null, Validators.compose([Validators.required])],
      porcentajeEntrega: [null, Validators.compose([Validators.required])],
      porcentajeValidacion: [null, Validators.compose([Validators.required])],
      fechaCreacion: [null],
    });

    this.form.get('titulo').valueChanges.subscribe((x)=>{
      if(x){
        this.contadorCaracteresTitulo = x.length;
      } else {
        this.contadorCaracteresTitulo = 0;
      }
    });

    this.form.get('detalle').valueChanges.subscribe((x)=>{
      if(x){
        this.contadorCaracteresDetalle = x.length;
      } else {
        this.contadorCaracteresDetalle = 0;
      }
    });
  }

  public llenarFormulario() {
    
    this.form.patchValue(this.acuerdoActualModel);
  }

  public close() {
    this.form.reset();
  }

  public guardarAcuerdo() {
    
    let objeto = this.form.getRawValue();
    this.acuerdoService.guardarEditarAcuerdo(objeto).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click();
        this.messageEvent.emit(true);
        
        this.alertService.showAlertSuccess("Guardado exitosamente.");
      },
      (err: any) => {
        this.spinner.hide();
        this.closeModal.nativeElement.click();
        this.messageEvent.emit(false);
        /* this.modalDialogService.showDialog(
          "Atención",
          "Error",
          MENSAJES_ERROR.http500,
          () => {}
        ); */
      }
    );

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.acuerdoServiceSubscription$.unsubscribe();
  }
}

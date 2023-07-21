import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { FileUploadComponent } from "src/app/seguimiento/components/file-upload/file-upload.component";
import { AlertaService } from "src/app/shared/services/seguimiento/alerta.service";
import { AutenticacionService } from "src/app/shared/services/autenticacion/autenticacion.service";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";
import { Entidad } from "src/app/shared/model/situacion-actual/Entidad";

declare var $: any;

@Component({
  selector: "app-agregar-alerta",
  templateUrl: "./agregar-alerta.component.html",
  styleUrls: ["./agregar-alerta.component.css"],
})
export class AgregarAlertaComponent implements OnInit, OnDestroy {
  formAgregarAlerta: FormGroup;
  isSubmit: boolean = false;
  @ViewChild("fileAgregarAlerta") fileComponent: FileUploadComponent;
  private subscSemana: Subscription;
  private servAlertCrear: Subscription;
  private entidad: Entidad;
  @Output()
  nuevaAlerta: EventEmitter<any> = new EventEmitter();

  constructor(
    private servAlert: AlertaService,
    private alert: AlertService,
    private autenticacionService: AutenticacionService,
    private servEstado: EstadoService
  ) {}

  ngOnDestroy(): void {
    if (this.subscSemana) this.subscSemana.unsubscribe();
    if (this.servAlertCrear) this.servAlertCrear.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.cargarSemana();
  }
  private initForm(): void {
    this.formAgregarAlerta = new FormGroup({
      desTitulo: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      desAlerta: new FormControl("", [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    });
  }

  private cargarSemana(): void {
    this.subscSemana = this.servEstado.getEstado$().subscribe((entidad) => {
      if (entidad) {
        this.entidad = entidad;
      }
    });
  }

  get titulo() {
    return this.formAgregarAlerta.get("desTitulo");
  }

  get detalle() {
    return this.formAgregarAlerta.get("desAlerta");
  }

  formAgregarAlertaSubmit(): void {
    this.formAgregarAlerta.markAllAsTouched();

    if (this.formAgregarAlerta.valid) {
      this.isSubmit = true;
      var formdata = new FormData();
      const files: File[] = this.fileComponent.getFiles();

      formdata.append("cveEntidad", this.entidad.cveEntidad);
      formdata.append(
        "cveUsuarioAlta",
        this.autenticacionService.usuarioSesion.cveUsuario
      );
      formdata.append(
        "desNombreUsuario",
        this.autenticacionService.usuarioSesion.nombrePersonal
      );
      formdata.append("desTitulo", this.titulo.value);
      formdata.append("desAlerta", this.detalle.value);

      files.forEach((f) => {
        formdata.append("files", f);
      });

      this.servAlertCrear = this.servAlert.guardarAlerta(formdata).subscribe(
        (resp) => {
          $("#mdlAgregarAlert").modal("hide");
          this.alert.showAlertSuccess(
            "La información ha sido guardado exitosamente."
          );
          this.initForm();
          this.nuevaAlerta.emit(null);
        },
        (err: any) => {
          $("#mdlAgregarAlert").modal("hide");
          this.alert.showAlertError("Ha ocurrido un error al crear la ALERTA");
          this.initForm();
          console.log("Error al guardar la alerta.", err);
        }
      );
    }
  }

  resetForm(): void {
    this.initForm();
    this.isSubmit = false;
    this.fileComponent.setFiles([]);
  }
}

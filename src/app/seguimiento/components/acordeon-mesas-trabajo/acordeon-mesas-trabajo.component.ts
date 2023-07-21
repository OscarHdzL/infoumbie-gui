import { Component, Input, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { AvanceSemanalMesaTrabajoService } from "src/app/shared/services/seguimiento/avance-semanal-mesa-trabajo.service";
import { b64toBlob } from "src/app/shared/utils/file-utils";
import { saveAs } from "file-saver";

@Component({
  selector: "app-acordeon-mesas-trabajo",
  templateUrl: "./acordeon-mesas-trabajo.component.html",
  styleUrls: ["./acordeon-mesas-trabajo.component.css"],
})
export class AcordeonMesasTrabajoComponent implements OnInit {
  @Input() public title = "";
  public open = true;
  public idEstado: string = "";
  public numeroSemana: number = 0;

  constructor(
    private spinnerService: NgxSpinnerService,
    private mesaTrabajoAS: AvanceSemanalMesaTrabajoService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {}

  public show() {
    this.open = !this.open;
  }

  public descargarPowerPoint() {
    this.spinnerService.show();
    this.mesaTrabajoAS
      .descargarPowerPoint(this.numeroSemana.toString(), this.idEstado)
      .subscribe(
        (resp) => {
          const blob: Blob = b64toBlob(
            resp.archivoBase64,
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          );
          saveAs(blob, resp.nombreArchivo);
          this.spinnerService.hide();
        },
        (error) => {
          this.spinnerService.hide();
          this.alertService.showAlertError(
            "Ha ocurrido un error al descargar el archivo power point."
          );
        }
      );
  }
}

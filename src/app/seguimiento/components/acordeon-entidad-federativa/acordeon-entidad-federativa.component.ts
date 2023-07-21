import { Component, Input, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { AvanceSemanalMesaTrabajoService } from "src/app/shared/services/seguimiento/avance-semanal-mesa-trabajo.service";
import { b64toBlob } from "src/app/shared/utils/file-utils";
import { saveAs } from "file-saver";

@Component({
  selector: "app-acordeon-entidad-federativa",
  templateUrl: "./acordeon-entidad-federativa.component.html",
  styleUrls: ["./acordeon-entidad-federativa.component.css"],
})
export class AcordeonEntidadFederativaComponent implements OnInit {
  @Input() public title = "";
  public open = true;

  constructor(
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {}

  public show() {
    this.open = !this.open;
  }

}

import { Component, Input, OnInit} from "@angular/core";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { PermisosService } from "src/app/shared/services/autenticacion/permisos.service";

@Component({
  selector: "app-toggle-switch",
  templateUrl: "./toggle-switch.component.html",
  styleUrls: ["./toggle-switch.component.css"],
})
export class ToggleSwitchComponent implements OnInit {
  @Input() nombreComponente: string = "";
  @Input() permiso: string = "";
  habilitado: boolean = false;
  titulo: string = "";


  constructor(
    private permisosService: PermisosService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.habilitado = this.permisosService.hasPermisoComponente(
      this.nombreComponente
    );
    this.titulo = this.habilitado ? "Inhabilitar" : "Habilitar";
  }

  habilitar(e) {
    if (e.target.checked) {
      this.permisosService
        .habilitaDeshabilitaComponente(true, this.nombreComponente)
        .subscribe(
          (response) => {
            this.alertService.showAlertSuccess(
              "La captura de información ha sido habilitada."
            );
            this.titulo = "Inhabilitar";
          },
          (error) => {
            this.alertService.showAlertError(
              "Ha ocurrido un error al habilitar componente."
            );
          }
        );
    } else {
      this.permisosService
        .habilitaDeshabilitaComponente(false, this.nombreComponente)
        .subscribe(
          (response) => {
            this.alertService.showAlertSuccess(
              "La captura de información ha sido inhabilitada."
            );
            this.titulo = "Habilitar";
          },
          (error) => {
            this.alertService.showAlertError(
              "Ha ocurrido un error al deshabilitar componente."
            );
          }
        );
    }
  }
}

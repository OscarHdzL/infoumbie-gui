import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NAVEGACION } from "src/app/shared/constants/navigation";
import { UsuarioSesion } from "src/app/shared/model/session/usuarioSesion";
import { AutenticacionService } from "src/app/shared/services/autenticacion/autenticacion.service";
import { WebsocketService } from "src/app/shared/services/seguimiento/websocket.service";

@Component({
  selector: "app-subheader-seguimiento",
  templateUrl: "./subheader-seguimiento.component.html",
  styleUrls: ["./subheader-seguimiento.component.css"],
})
export class SubheaderSeguimientoComponent implements OnInit {
  constructor(
    private autenticacionService: AutenticacionService,
    public router: Router,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {}

  get usuarioSesion(): UsuarioSesion {
    return this.autenticacionService.usuarioSesion;
  }

  salir() {
    this.autenticacionService.logout();
    localStorage.removeItem("descNivel");
    localStorage.removeItem("tipoUnidad");
    this.websocketService.disconnect();
    return this.router.navigate([NAVEGACION.login]);
  }
}

import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AutenticacionService} from "../../shared/services/autenticacion/autenticacion.service";
import {SessionSituacionActualService} from "../../shared/services/situacion-actual/session-situacion-actual.service";

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {
  public entidad: string = null;

  constructor(private autenticacionService: AutenticacionService, private sessionSituacionActualService: SessionSituacionActualService) { }

  ngOnInit(): void {
    if(this.sessionSituacionActualService.isGobernador()) {
      this.entidad = this.sessionSituacionActualService.getAsignacion().entidad
    }
  }

  public irVotaciones() {
    window.open(`${environment.urlVotaciones}/${this.autenticacionService.token}`, '_blank')
  }

}

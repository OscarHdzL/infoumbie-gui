import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-informacion-usuario-asignacion',
  templateUrl: './informacion-usuario-asignacion.component.html',
  styleUrls: ['./informacion-usuario-asignacion.component.css']
})
export class InformacionUsuarioAsignacionComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
  }

  get usuario () { return this.autenticacionService.usuarioSesion.asignaciones[0] }

}

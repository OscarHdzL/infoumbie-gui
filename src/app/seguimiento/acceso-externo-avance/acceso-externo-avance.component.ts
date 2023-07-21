import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AutenticacionService} from "../../shared/services/autenticacion/autenticacion.service";
import {NAVEGACION} from "../../shared/constants/navigation";

@Component({
  selector: 'app-acceso-externo-avance',
  templateUrl: './acceso-externo-avance.component.html',
  styleUrls: ['./acceso-externo-avance.component.css']
})
export class AccesoExternoAvanceComponent implements OnInit {

  private token: string;
  public tokenError = false;

  constructor(
      private router: Router,
      private activatedRoute:ActivatedRoute,
      private autenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    console.log("token->" + this.token);
    if(this.token){
      this.token;
      this.autenticacionService.guardarToken(this.token);
      this.autenticacionService.guardarUsuario(this.token);
      this.router.navigate([NAVEGACION.avance]);
    } else {
      this.tokenError = true;
    }
  }

}

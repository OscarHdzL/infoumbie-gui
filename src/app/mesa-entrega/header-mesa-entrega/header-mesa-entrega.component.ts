import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { UsuarioSesion } from 'src/app/shared/model/session/usuarioSesion';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-header-mesa-entrega',
  templateUrl: './header-mesa-entrega.component.html',
  styleUrls: ['./header-mesa-entrega.component.scss']
})
export class HeaderMesaEntregaComponent implements OnInit {
  @Input() mostrarDropdownMesa: boolean = false;
  public usuarioSesion = new UsuarioSesion({nombrePersonal: 'Personal prueba', perfil: 'Mi perfil'});


  constructor(
    private autenticacionService: AutenticacionService,
    public router: Router,  
  ) {
    /* this.usuarioSesion.nombrePersonal = 'Personal prueba';
    this.usuarioSesion.perfil = 'Mi perfil'; */
  }

  ngOnInit(): void {}

/*   get usuarioSesion(): UsuarioSesion {
    return this.autenticacionService.usuarioSesion;
  } */

  salir() {
    this.autenticacionService.logout();
    localStorage.removeItem("descNivel");
    localStorage.removeItem("tipoUnidad");
    
    return this.router.navigate([NAVEGACION.login]);
  }
}

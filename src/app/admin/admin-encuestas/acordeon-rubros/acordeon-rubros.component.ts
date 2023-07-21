import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { AdminEncuestasService } from 'src/app/shared/services/admin-encuestas/admin-encuestas.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-acordeon-rubros',
  templateUrl: './acordeon-rubros.component.html',
  styleUrls: ['./acordeon-rubros.component.css']
})
export class AcordeonRubrosComponent implements OnInit {

  @Input() rubro: any;
  @Input() area: any;

  @Output() messageEvent = new EventEmitter<boolean>();

  open: boolean = true;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService,
    private alertService: AlertService,
    private adminEncuestasService: AdminEncuestasService,
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit(): void {
  }

  public show() {
    this.open = !this.open;
  }

  public editarRubro(){
    let infoRubro = {
      title: 'Editar rubro',
      edit: true,
      area: this.area.desArea,
      rubro: this.rubro
    };

    this.adminEncuestasService.setDescripcion(infoRubro);
  }

  public eliminarRubro(){
    let rubro = {
      cveArea: this.area.cveArea,
      cveRubro: this.rubro?.cveRubro,
      desRubro: this.rubro?.desRubro,
      cveUsuario: this.autenticacionService.usuarioSesion.cveUsuario
    }    

    this.adminEncuestasService.eliminarRubro(rubro).subscribe((response: any) => {      
      this.adminEncuestasService.setDescripcion(null);
      this.messageEvent.emit(true);        
      this.alertService.showAlertSuccess('Eliminado exitosamente.');  
      this.spinner.hide();     
    }, (err: any) => {
      this.spinner.hide();
      this.adminEncuestasService.setDescripcion(null);
      this.messageEvent.emit(false);
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });
  }

  receiveMessage(evento: boolean) {
    if(evento){
      this.messageEvent.emit(evento);
    }
  }

}

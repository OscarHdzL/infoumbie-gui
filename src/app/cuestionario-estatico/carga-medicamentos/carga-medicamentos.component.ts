import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EIC_ESTATUS, MENSAJES_ERROR } from 'src/app/shared/constants/global';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { Archivo } from 'src/app/shared/model/archivo/archivo';
import { Area } from 'src/app/shared/model/area/area';
import { Rubro } from 'src/app/shared/model/rubro/Rubro';
import { RubroCuestiona } from 'src/app/shared/model/rubro/RubroCuestiona';
import { AutenticacionService } from 'src/app/shared/services/autenticacion/autenticacion.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';
import { CuestionarioService } from 'src/app/shared/services/cuestionario/cuestionario.service';
import { EstadisticasService } from 'src/app/shared/services/estadisticas/estadisticas.service';

@Component({
  selector: 'app-carga-medicamentos',
  templateUrl: './carga-medicamentos.component.html',
  styleUrls: ['./carga-medicamentos.component.css']
})
export class CargaMedicamentosComponent implements OnInit {

  @Input() rubroSeleccionado: Rubro;
  @Input() areaSeleccionada: Area;
  @Output() cierreRubro  = new EventEmitter<any>(); 

  public indCuestionarioCerrado: boolean = false;
  public nombreArchivo: string = null;
  public existeDocumento: boolean = false;
  public archivos: Archivo[] = [];
  public datosExcel: []=[];
  
  constructor(
    private spinner: NgxSpinnerService,
    private autenticacionService: AutenticacionService,
    private cuestionarioService: CuestionarioService,
    private modalDialogService: ModalDialogService,
    private estadisticasService: EstadisticasService,
    private router: Router
  ) { }

  ngOnInit(): void {
      
    //if(this.rubroSeleccionado.idRubro === 337){
      this.cargarDatosExcel();
    //}
  }

  cargarDatosExcel(){
    this.spinner.show();
    let refClue = sessionStorage.getItem('refClue').split('-');
    let cveUsuario = JSON.parse(sessionStorage.getItem('usuarioSesion'));
    this.estadisticasService.getExcelMedicamentos(cveUsuario.cveUsuario,refClue[0])
    .subscribe( (resp:any) =>{
      this.spinner.hide();
      switch (resp.status) {
        case 200:
          this.datosExcel = resp.body;
          break;
        case 204:
          //this.modalDialogService.showDialog('Atención', "Atención", MENSAJES_ERROR.http204, () => { });
          break;
      }
    }, (err: any) => {
      this.spinner.hide();
      this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
    });

  }

  get navegacion() { return NAVEGACION;}
  
  uploadedArchivo: File = new File([], '');

  public onImageUpload(event: any) {

    let ext = event.target.files[0].type;

    if(event.target.files[0].size < 10089304){

        if(ext == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || ext == 'application/vnd.ms-excel'){
          this.uploadedArchivo = event.target.files[0];
          this.nombreArchivo = event.target.files[0].name;
          this.existeDocumento = true;
        }else{
          this.modalDialogService.showDialog('Atención', "Atención", 'Formato no valido', () => { });
        }
 
    }else{
      this.modalDialogService.showDialog('Atención', "Atención", 'El tamaño del archivo excede de 10MB, no es posible cargarlo', () => { });
    }

  }


  subir() {
    const archivoFormData = new FormData();
    let refClue = sessionStorage.getItem('refClue').split('-');
    let cveUsuario = JSON.parse(sessionStorage.getItem('usuarioSesion'));
      archivoFormData.append('file',this.uploadedArchivo,this.uploadedArchivo.name);

      this.spinner.show();
      this.estadisticasService.enviarExcelMedicamentos( archivoFormData, cveUsuario.cveUsuario, refClue[0] )
        .subscribe(
          (response: any) => {
            this.spinner.hide();
            switch(response.status){
              case 200:
              // this.router.navigate([NAVEGACION.home]);
              if(response.body.exitosos === 0){
                this.modalDialogService.showDialog('Atención', "Atención", `No se subió ningún registro, ya que la CLUES ${ refClue[0] } - ${ refClue[1] } es diferente a los datos a cargar`, () => { });
              return;
              }else{
                this.cargarDatosExcel();
                this.modalDialogService.showDialog('Éxito', "Éxito", `Se cargaron ${response.body.exitosos } registros con la clues  ${ refClue[0] } - ${ refClue[1] } `, () => { });
                this.nombreArchivo = null;
                this.existeDocumento = false;
              }

              break;
              case 204:
                this.modalDialogService.showDialog('Atención', "Atención", MENSAJES_ERROR.http204, () => { });
              break;
            }
          },
          (err: any) => {
            this.spinner.hide();
            if(err.status == 400){
              this.modalDialogService.showDialog('Atención', "Error", err.error.reasonPhrase, () => { });
            }else{
              this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            }

          }
        );
    
  }

}

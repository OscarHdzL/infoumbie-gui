import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ComentariosService } from 'src/app/shared/services/seguimiento/comentarios.service';
import {Comentarios} from "../../../shared/model/seguimiento/comentarios";
import {AutenticacionService} from "../../../shared/services/autenticacion/autenticacion.service";
import {AlertService} from "../../../shared/services/alert/alert.service";
import {ArchivosService} from "../../../shared/services/seguimiento/archivos.service";
import {FileUploadComponent} from "../../components/file-upload/file-upload.component";

@Component({
  selector: 'app-nuevo-comentario',
  templateUrl: './nuevo-comentario.component.html',
  styleUrls: ['./nuevo-comentario.component.css']
})
export class NuevoComentarioComponent implements OnInit {

    @ViewChild('file')
    fileComponent: FileUploadComponent;

  @Output() newItemEvent = new EventEmitter<boolean>();

  @Input()
  public cveClue: number;

    @Input()
    public cveEntidad: string;
  
  //activoSection: boolean

  contador = 0;
  fileTemp: any;
  comentario: string;

  constructor(private comentariosService: ComentariosService, private autenticacionService: AutenticacionService,
              private alertService: AlertService, private archivosService: ArchivosService) { }

  ngOnInit(): void {
  }

  onKey(event:any){
    this.contador = event.target.value.length
    //console.log('🛶🛶', this.contador);
     this.comentario = event.target.value;
   }


   getFile($event){
    console.log($event.target.files );
    const [file] = $event.target.files
    console.log(file);

    this.fileTemp = {
      fileRaw: file,
      fileName: file.name 
    }
    
   }

   nuevoComentario(){
    console.log('nnuevo comentario 🛶🛶🛶🛶🛶🛶', this.comentario);
    if(this.comentario!=null && this.comentario.trim().length>0){
      this.comentariosService.guardaComentario({
          cveClueComentario: null,
          desComentario: this.comentario,
          cveClue: this.cveClue,
          nomUsuario: this.autenticacionService.usuarioSesion.nombrePersonal,
          cveUsuarioAlta: this.autenticacionService.usuarioSesion.cveUsuario,
          fecAlta: new Date()
      }).subscribe(comentarioResp => {
          if (this.fileComponent.getFiles() && this.fileComponent.getFiles().length > 0) {
              this.archivosService.subirArchivosComentarios(
                  this.fileComponent.getFiles() ,
                  comentarioResp.cveClueComentario,
                  this.cveEntidad
              ).subscribe(archivosResponse => {
                  this.alertService.showAlertSuccess('Se ha guardado el comentario satisfactoriamente.');
                  this.newItemEvent.emit(true);
              }, error => {
                  this.alertService.showAlertError('Ha ocurrido un error al cargar los archivos.');
              });
          } else {
              this.alertService.showAlertSuccess('Se ha guardado el comentario satisfactoriamente.');
              this.newItemEvent.emit(true);
          }
      });
    }else{
      this.alertService.showAlertError('No puedes guardar campos vacíos.');
    } 
   }

   cancelar(){
      this.newItemEvent.emit(false);
   }

}
 
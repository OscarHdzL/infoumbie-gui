import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { NAVEGACION } from 'src/app/shared/constants/navigation';
import { AcuerdoModel } from 'src/app/shared/model/MesaEntrega/AcuerdoModel';
import { ComentarioAcuerdoModel } from 'src/app/shared/model/MesaEntrega/ComentarioAcuerdoModel';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';
import { ComentarioAcuerdoService } from 'src/app/shared/services/MesaEntrega/comentario-acuerdo.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-comentario-mesa-entrega',
  templateUrl: './comentario-mesa-entrega.component.html',
  styleUrls: ['./comentario-mesa-entrega.component.css']
})
export class ComentarioMesaEntregaComponent implements OnInit {
  nombreMesa = '';
  componente = 'COMENTARIOS DEL ACUERDO';
  idAcuerdo = 0;
  formularioComentario: FormGroup;
  contador: number = 0;
  formularioVisible: boolean = false;
  irAtras = NAVEGACION.mesa_entrega_recepcion +'/'+ this.nombreMesa;

  listaComentarios = new Array<ComentarioAcuerdoModel>();
  acuerdoServiceSubscription$: Subscription;
  acuerdoActualModel: AcuerdoModel = new AcuerdoModel();
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private acuerdoService: AcuerdosService,
    private comentariosAcuerdoService: ComentarioAcuerdoService,
    private alertService: AlertService,
    private router: Router
  ) { 

    
    this.route.params.subscribe(params => {
      this.nombreMesa = params['mesa']; // (+)  converts string 'id' to a number => +params['id']
      this.idAcuerdo = +params['id'];
    });
    this.irAtras = NAVEGACION.mesa_entrega_recepcion +'/'+ this.nombreMesa;

    this.acuerdoServiceSubscription$ = this.acuerdoService
      .getAcuerdoActual()
      .subscribe((data) => {
        if(!data){
          this.router.navigate([this.irAtras]);
        }
          this.acuerdoActualModel = data;
        console.log("AcuerdoActual", data);
        this.crearFormulario();
        this.obtenerComentarios();
      });
  }

  ngOnInit() {
    //this.crearFormulario();
  }

  
  ngOnDestroy(): void {
    if (this.acuerdoServiceSubscription$) {
      this.acuerdoServiceSubscription$.unsubscribe();
    }
  }

  public obtenerComentarios(){
    this.comentariosAcuerdoService.getComentarioAcuerdos(this.acuerdoActualModel.id).subscribe(
      (data) => {
        
        this.listaComentarios = data;
      },
      (error) => {
        
        console.log('Ocurrio un error en consulta de Comentarios');
        console.log(error);
        this.listaComentarios = [];
      }
    );
  }

  private crearFormulario(){
    this.formularioComentario = this.formBuilder.group({
      id: [0],
      comentario: [null, Validators.compose([Validators.required])],
    });    

    this.comentario.valueChanges.subscribe((x)=>{
      
      this.contador = x.length;
    });
  }

  get comentario(){
    return this.formularioComentario.get('comentario');
  }

  nuevoComentario(){
    this.formularioVisible = true;
    this.comentario.setValue('');
  }


  anadirComentario(){
    this.comentario.reset();
    this.formularioVisible = false;
  }

  editarComentario(idComentario){
    this.formularioVisible = true;
    this.comentario.setValue("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.");
  }


  public receiveMessage(cancelacionComentario: boolean) {    
   if(cancelacionComentario){
    //this.formularioComentario.reset();
    this.comentario.setValue('');
    this.formularioVisible = false;
   } else {
    this.formularioVisible = true;
   }
  }


  public guardarComentario(){
    
    let comentario = this.formularioComentario.getRawValue();

    let objComentario = new ComentarioAcuerdoModel();
    objComentario.id = 0;
    objComentario.acuerdoId = this.acuerdoActualModel.id;
    objComentario.comentario = comentario.comentario;
    objComentario.fechaCreacion = new Date();
    objComentario.cancelacion = 0;


    this.comentariosAcuerdoService.guardarEditarComentarioAcuerdo(objComentario).subscribe(
      (response) => {
        this.alertService.showAlertSuccess("Guardado exitosamente.");
        this.anadirComentario();
        this.obtenerComentarios();
      }, 
      (error) => {
        console.log('ocurrio un error al guardar');
      }
    );

  }

}

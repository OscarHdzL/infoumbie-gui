import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Camas} from 'src/app/shared/model/situacion-actual/AreaMedica';
import { ServiciosAgrupados } from 'src/app/shared/model/situacion-actual/Oferta-Servicio';
import { AreaMedicaService } from 'src/app/shared/services/situacion-actual/area-medica.service';
import { CluesService } from 'src/app/shared/services/situacion-actual/clues.service';

@Component({
  selector: 'app-area-medica',
  templateUrl: './area-medica.component.html',
  styleUrls: ['./area-medica.component.css']
})
export class AreaMedicaComponent implements OnInit {

  public listaServicios: ServiciosAgrupados[] = [];
  public detalleInfoCamas: Camas = new Camas();
  public loading: boolean;
  public vacio: boolean;
  public suscClueServ: Subscription;

  constructor(
    private areaMedicaService: AreaMedicaService,
    private cluesService: CluesService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.vacio= true;

   // setTimeout(()=>{
      this.suscClueServ = this.cluesService.getClues$()
      .subscribe(clue => {
        console.log("CLUE AREA MEDICA",clue);
        if(clue){
          this.loading = true;
          this.listaServicios = [];
          this.informacionAreaMedica(clue.refClues);
        }else{
          console.log("refClue Vacia");
          this.vacio = true;
          this.detalleInfoCamas = new Camas();
          this.listaServicios = [];
          this.loading = false;
        }
      })
     
    //},4000)
 
  }

  informacionAreaMedica(refClue: string){
    this.areaMedicaService.getInfoAreaMedica(refClue)
    .subscribe(resp=>{
      console.log("INFO AREA MEDICA", resp);
      if (resp[0].length > 0) {
        
        this.detalleInfoCamas.camasCensables = resp[0][0].camasCensables;
        this.detalleInfoCamas.camasNoCensables = resp[0][0].camasNoCensables;
        this.detalleInfoCamas.cuidadosIntensivos = resp[0][0].cuidadosIntensivos;
        this.detalleInfoCamas.totalCamas = resp[0][0].totalCamas;
        this.vacio = false;
      }else{
        this.vacio = true;
      }

      this.listaServicios = resp[1];
      this.loading = false;

    },(err: any) => {
      this.loading = false;
      //this.vacio = false;
      console.log("Ocurrio un error en el servicio getInfoAreaMedica");
      console.log(err);
    })
  }
 
  ngOnDestroy(): void{
    if(this.suscClueServ){
      this.suscClueServ.unsubscribe();
    }
  }

}

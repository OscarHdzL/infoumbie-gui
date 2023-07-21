import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TokenSharePoint } from 'src/app/shared/model/situacion-actual/TokenSharePoint';
import { CluesService } from 'src/app/shared/services/situacion-actual/clues.service';
import { SituacionActualService } from 'src/app/shared/services/situacion-actual/situacion-actual.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public indexSelected = 0;
  public suscGetToken: Subscription;

  constructor(
    private situacionActualService: SituacionActualService,
    private clueService: CluesService
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{                          
      this.obtenerToken();
    }, 1440000); // 40000 => 40 segundos, 60000 = 1 minuto
  }

  obtenerToken(){
    this.suscGetToken = this.situacionActualService.getTokenSharePoint()
    .subscribe(token => {
    },(err: any) => {
      console.log("Error en el servcio getTokenSharepoint", err);
    }
    );
  }

  ngOnDestroy(){
    this.clueService.setClues(null);
    if(this.suscGetToken){
      this.suscGetToken.unsubscribe();
    }
  }

}

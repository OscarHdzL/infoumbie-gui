import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AcuerdosService } from 'src/app/shared/services/MesaEntrega/acuerdos.service';

@Component({
  selector: 'app-total-acuerdos-activos',
  templateUrl: './total-acuerdos-activos.component.html',
  styleUrls: ['./total-acuerdos-activos.component.scss']
})
export class TotalAcuerdosActivosComponent implements OnInit {
  
  @Input() titulo: string = '';
  @Input() contador: number = 0;
  acuerdoServiceSubscription$: Subscription;
  
  /**
   *
   */
  constructor(
    private acuerdoService: AcuerdosService,
    //private acuerdoService: AcuerdosService,
  ) {
   
    
  }
  ngOnInit(): void {
    this.loadData();

    this.acuerdoServiceSubscription$ = this.acuerdoService.getContadorAcuerdosActivos().subscribe(
      (data) => {
        
        this.contador = data;
      });

  }
  loadData() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  
  ngOnDestroy(): void {  
    if (this.acuerdoServiceSubscription$) {
      this.acuerdoServiceSubscription$.unsubscribe();
    }
  }
}

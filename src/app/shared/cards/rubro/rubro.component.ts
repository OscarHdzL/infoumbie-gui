import { Component, Input, SimpleChanges, OnChanges, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { Rubro } from '../../model/rubro/Rubro';
import { RubroService } from '../../services/rubro/rubro.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit, OnChanges {

  @Input() rubro: Rubro;
  @Input() idItem: number;
  @Input() idItemSelecte: any;
  //@Input() indexSelect: any;

  //recibimos el indice de la opcion elegida en el carrusel
  @Input() indexOpcion: number;

  idItemSelecteBefore: string;

  @Output() rubroSelected = new EventEmitter<Rubro>();

  //enviamos el indice de la card elegida al componente padre contenedor-cuestionario
  @Output() indexRubroSelected = new EventEmitter<number>();

  public rubros: Rubro[];

  constructor(
    private rubroService: RubroService
    ) { }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if (name === 'idItemSelecte') {
        if (this.idItemSelecte != null && this.idItemSelecte != undefined) {
          this.idItemSelecte = Number(this.idItemSelecte);
          this.asignarClass();
        }
      }
      //Se activa la card en base al numero de opcion de la paginacion del carrusel
      if (name === 'indexOpcion') {
        this.activarCard(this.indexOpcion);
      }
    }

  }

  asignarClass() { }

  activarCard(indice: number) {
    let elements = document.getElementsByClassName("cartaRubro-" + indice);
    let elementsContenedores = document.getElementsByClassName("divContenedorRubro");
    for (let i = 0; i < elementsContenedores.length; i++) {
      elementsContenedores[i].classList.remove('selectBordeCart');
    }
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('selectBordeCart');
    }
  }


  ngOnInit(): void {
    this.rubros = this.rubroService.getRubrosSesion();
  }

  public getRubroSelected(rubro: Rubro, indexCard: number) {
    this.activarCard(indexCard);
    rubro = new Rubro(rubro);
    rubro.indSelected = true;
    this.rubroSelected.emit(rubro);
    this.indexRubroSelected.emit(indexCard);
  }

}

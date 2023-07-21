import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_ERROR, TIPO_AUTOCOMPLETE } from 'src/app/shared/constants/global';
import { DiagnosticoCIE } from 'src/app/shared/model/catalogos/DiagnosticoCIE';
import { MedicamentoCat } from 'src/app/shared/model/catalogos/MedicamentoCat';
import { ListaMedicamentos } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Medicamentos/ListaMedicamentos';
import { DiagnosticoReferencia } from 'src/app/shared/model/cuestionario/cuestionarioEstatico/Referencias/DiagnosticosReferencia';
import { CatalogosService } from 'src/app/shared/services/catalogos/catalogos.service';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-cuestionario-estatico-autocomplete-list',
  templateUrl: './cuestionario-estatico-autocomplete-list.component.html',
  styleUrls: ['./cuestionario-estatico-autocomplete-list.component.css']
})
export class CuestionarioEstaticoAutocompleteListComponent implements OnInit {

  constructor(
    private catalogosService: CatalogosService,
    private spinner: NgxSpinnerService,
    private modalDialogService: ModalDialogService
  ) { }

  @Input() tipo: number;
  @Input() limite: number;
  @Input() diagnosticosCIEPrevios: DiagnosticoReferencia[];
  @Input() medicamentosPrevios: any[];
  @Input() medicamentosPrevios_2: any[];
  @Input() urgenciasLista: any[];
  @Input() btnBloquearBusqueda: boolean;

  @Output() diagnosticosList: EventEmitter<DiagnosticoCIE[]> = new EventEmitter<DiagnosticoCIE[]>();
  @Output() medicamentosList: EventEmitter<MedicamentoCat[]> = new EventEmitter<MedicamentoCat[]>();
  @Output() urgenciaListaCIE10: EventEmitter<any[]> = new EventEmitter<any[]>();

  public filtro: string;
  public diagnosticosCIE: DiagnosticoCIE[];
  public medicamentos: MedicamentoCat[];
  public medicamentos_2: MedicamentoCat[];
  public elementosTabla: any[] = [];
  public elementosTabla_2: any[] = [];
  private columnNames: string[] = [];
  private columnNames_2: string[] = [];

  ngOnInit(): void {
    switch (this.tipo) {
      case TIPO_AUTOCOMPLETE.DIAGNOSTICOS:
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA:

        if (this.diagnosticosCIEPrevios != undefined && this.diagnosticosCIEPrevios != null && this.diagnosticosCIEPrevios.length > 0 ) {
          this.columnNames = Object.getOwnPropertyNames(this.diagnosticosCIEPrevios[0]);
          console.log(this.columnNames);
          this.diagnosticosCIEPrevios.forEach(element => {
            let diagnosticoCIE = new DiagnosticoCIE();
            diagnosticoCIE.cie = element.diagnostico;
            diagnosticoCIE.idCie = element.idCie;
            diagnosticoCIE.refCie = element.refCie10;
            this.elementosTabla.push(diagnosticoCIE);
          });
        }

        break;
      case TIPO_AUTOCOMPLETE.MEDICAMENTOS:
      case TIPO_AUTOCOMPLETE.INSUMOS:

        if (this.medicamentosPrevios != undefined && this.medicamentosPrevios != null && this.medicamentosPrevios.length > 0 ) {
          this.columnNames = Object.getOwnPropertyNames(this.medicamentosPrevios[0]);
          console.log(this.columnNames);
          this.medicamentosPrevios.forEach(element => {
            let medicamentoCat = new MedicamentoCat();
            medicamentoCat.idMedicamento = element.idMedicamentoCatalogo;
            medicamentoCat.cantidad = Number(element.canPresenta);
            medicamentoCat.concentracion = element.concentracion;
            medicamentoCat.forma = element.forma;
            medicamentoCat.generico = element.medicamento;
            this.elementosTabla.push(medicamentoCat);
          });
        }

        
        break;
      case TIPO_AUTOCOMPLETE.INSUMOS_2:
        
        if (this.medicamentosPrevios_2 != undefined && this.medicamentosPrevios_2 != null && this.medicamentosPrevios_2.length > 0 ) {
          this.columnNames_2 = Object.getOwnPropertyNames(this.medicamentosPrevios_2[0]);
          console.log(this.columnNames_2);
          this.medicamentosPrevios_2.forEach(element => {
            let medicamentoCat = new MedicamentoCat();
            medicamentoCat.idMedicamento = element.idMedicamentoCatalogo;
            medicamentoCat.cantidad = Number(element.canPresenta);
            medicamentoCat.concentracion = element.concentracion;
            medicamentoCat.forma = element.forma;
            medicamentoCat.generico = element.medicamento;
            this.elementosTabla_2.push(medicamentoCat);
          });
        }
        
        break;
      
      case TIPO_AUTOCOMPLETE.URGENCIAS_MEDICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_GINECOLOGICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_OTRAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_QUIRURGICAS:
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA_HOSPITALIZACION:
        
        if (this.urgenciasLista != undefined && this.urgenciasLista != null && this.urgenciasLista.length > 0 ) {
          this.urgenciasLista.forEach(element => {
            let diagnosticoCIE = new DiagnosticoCIE();
            diagnosticoCIE.idCie = element.idCie10;
            diagnosticoCIE.refCie = element.refCie10; 

            switch(this.tipo) {
              case TIPO_AUTOCOMPLETE.URGENCIAS_MEDICAS:
                diagnosticoCIE.cie = element.urgenciaMedica; 
              break;

              case TIPO_AUTOCOMPLETE.URGENCIAS_GINECOLOGICAS:
                diagnosticoCIE.cie = element.urgenciaGinecologica; 
              break;

              case TIPO_AUTOCOMPLETE.URGENCIAS_OTRAS:
                diagnosticoCIE.cie = element.OtrasUrgencias; 
              break;

              case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
                diagnosticoCIE.cie = element.urgenciaPediatrica; 
              break;

              case TIPO_AUTOCOMPLETE.URGENCIAS_QUIRURGICAS:
                diagnosticoCIE.cie = element.urgenciaQuirurgica; 
              break;

              case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
                diagnosticoCIE.cie = element.urgenciaPediatrica; 
              break;

              case TIPO_AUTOCOMPLETE.ATENCION_MEDICA_HOSPITALIZACION:
                diagnosticoCIE.cie = element.atencionMedicaHospitalizacion; 
              break;

            }
            
            this.elementosTabla.push(diagnosticoCIE);

          });
        }

        break;

      default:
        break;
    }
  }

  public selectedElement() {
    switch (this.tipo) {
      
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA:
      case TIPO_AUTOCOMPLETE.DIAGNOSTICOS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_MEDICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_GINECOLOGICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_OTRAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_QUIRURGICAS:
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA_HOSPITALIZACION:

        for (let index = 0; index < this.diagnosticosCIE.length; index++) {
          const element = this.diagnosticosCIE[index];
          let filtro_: string = String(this.filtro.slice(0, this.filtro.indexOf("-"))).trim();
          let repetido: boolean = false;
          if (element.refCie == filtro_) {
            this.elementosTabla?.forEach(element_ => {
              if (element.refCie == element_.refCie) {
                repetido = true;
                this.filtro = '';
              }
            });
            if (!repetido) {
              this.elementosTabla.push(element);
              this.filtro = '';
              // if(this.elementosTabla?.length >= this.limite){
              this.diagnosticosList.emit(this.elementosTabla);
              // }
              return;
            }
          }
        }
        break;
      case TIPO_AUTOCOMPLETE.MEDICAMENTOS:
      case TIPO_AUTOCOMPLETE.INSUMOS:
      
        for (let index = 0; index < this.medicamentos.length; index++) {
          const element = this.medicamentos[index];
          let filtro_: string = this.filtro.slice(0, this.filtro.indexOf("-")).trim();
          let repetido: boolean = false;
          // console.log(element.idMedicamento, filtro_);
          if (element.idEsp == filtro_) {
            this.elementosTabla?.forEach(element_ => {
              if (element.idMedicamento == element_.idMedicamento) {
                repetido = true;
                this.filtro = '';
              }
            });
            if (!repetido) {
              // console.log("Hago push: ", element);
              this.elementosTabla.push(element);
              this.filtro = '';
              // if(this.elementosTabla?.length >= this.limite){
              this.medicamentosList.emit(this.elementosTabla);
              // }
              return;
            }
          }
        }
        break;
      case TIPO_AUTOCOMPLETE.INSUMOS_2:
        for (let index = 0; index < this.medicamentos_2.length; index++) {
          const element = this.medicamentos_2[index];
          let filtro_: string = this.filtro.slice(0, this.filtro.indexOf("-")).trim();
          let repetido: boolean = false;
          // console.log(element.idMedicamento, filtro_);
          if (element.idEsp == filtro_) {
            this.elementosTabla_2?.forEach(element_ => {
              if (element.idMedicamento == element_.idMedicamento) {
                repetido = true;
                this.filtro = '';
              }
            });
            if (!repetido) {
              // console.log("Hago push: ", element);
              this.elementosTabla_2.push(element);
              this.filtro = '';
              // if(this.elementosTabla?.length >= this.limite){
              this.medicamentosList.emit(this.elementosTabla_2);
              // }
              return;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  public removeItem(index: number) {
    this.elementosTabla.forEach((item, index_) => {
      if (index_ === index) this.elementosTabla.splice(index_, 1);
    });
    switch (this.tipo) {
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA:
      case TIPO_AUTOCOMPLETE.DIAGNOSTICOS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_MEDICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_GINECOLOGICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_OTRAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
      case TIPO_AUTOCOMPLETE.URGENCIAS_QUIRURGICAS:
      case TIPO_AUTOCOMPLETE.ATENCION_MEDICA_HOSPITALIZACION:
        this.diagnosticosList.emit(this.elementosTabla);
        break;
      case TIPO_AUTOCOMPLETE.MEDICAMENTOS:
      case TIPO_AUTOCOMPLETE.INSUMOS:
     
        this.medicamentosList.emit(this.elementosTabla);
        break;
      case TIPO_AUTOCOMPLETE.INSUMOS_2:
        this.medicamentosList.emit(this.elementosTabla_2);
        break;
      default:
        break;
    }
  }

  public getInput($event, id) {
    let filtro = (<HTMLInputElement>document.getElementById(id)).value;

    if (filtro?.length > 2) {
//      this.spinner.show();
//      if (($event.timeStamp - this.lastkeydown) > 500) {
        switch (this.tipo) {
          case TIPO_AUTOCOMPLETE.ATENCION_MEDICA:
          case TIPO_AUTOCOMPLETE.DIAGNOSTICOS:
          case TIPO_AUTOCOMPLETE.URGENCIAS_MEDICAS:
          case TIPO_AUTOCOMPLETE.URGENCIAS_GINECOLOGICAS:
          case TIPO_AUTOCOMPLETE.URGENCIAS_OTRAS:
          case TIPO_AUTOCOMPLETE.URGENCIAS_PEDIATRICAS:
          case TIPO_AUTOCOMPLETE.URGENCIAS_QUIRURGICAS:
          case TIPO_AUTOCOMPLETE.ATENCION_MEDICA_HOSPITALIZACION:

            this.spinner.show();
            this.catalogosService.getDiagnosticosCIEByFiltro(filtro).subscribe((response: any) => {
              this.spinner.hide();
              switch (response.status) {
                case 200:
                  this.diagnosticosCIE = response.body;
                  for (let i = 0; i < this.diagnosticosCIE.length; i++) {
                    this.diagnosticosCIE[i].cie = this.diagnosticosCIE[i].cie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  }
                  break;
                case 204:
                  break;
              }
              
            }, (err: any) => {
              this.spinner.hide();
              this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            });

            break;
          case TIPO_AUTOCOMPLETE.MEDICAMENTOS:
          case TIPO_AUTOCOMPLETE.INSUMOS:

            this.spinner.show();
            this.catalogosService.getMedicamentosByFiltro(filtro).subscribe((response: any) => {
              this.spinner.hide();
              switch (response.status) {
                case 200:
                  this.medicamentos = response.body;
                  for (let i = 0; i < this.medicamentos.length; i++) {
                    this.medicamentos[i].concentracion = this.medicamentos[i].concentracion.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  }
                  
                  break;
                case 204:
                  break;
              }
            }, (err: any) => {
              this.spinner.hide();
              this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            });

            break;
          case TIPO_AUTOCOMPLETE.INSUMOS_2:
            console.log("entro a insumos 2");
            this.spinner.show();
            this.catalogosService.getMedicamentosByFiltro(filtro).subscribe((response: any) => {
              this.spinner.hide();
              switch (response.status) {
                case 200:
                  this.medicamentos_2 = response.body;
                  for (let i = 0; i < this.medicamentos_2.length; i++) {
                    this.medicamentos_2[i].concentracion = this.medicamentos_2[i].concentracion.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  }

                  
                  break;
                case 204:
                  break;
              }
            }, (err: any) => {
              this.spinner.hide();
              this.modalDialogService.showDialog('Atención', "Error", MENSAJES_ERROR.http500, () => { });
            });
            break;
        }
//      } else {
//        this.spinner.hide();
//      }
    } else {
      this.medicamentos = [];
      this.medicamentosPrevios_2 = [];
      this.diagnosticosCIE = [];
    }
  }

  private searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

  get tipoAutocomplete() {
    return TIPO_AUTOCOMPLETE;
  }

}
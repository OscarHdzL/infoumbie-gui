import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Entidad} from "../../shared/model/situacion-actual/Entidad";
import {Clues} from "../../shared/model/situacion-actual/Clues";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject, Subject } from "rxjs";
import {MatSelect} from "@angular/material/select";
import {CatalogosService} from "../../shared/services/catalogos/catalogos.service";
import {SessionSituacionActualService} from "../../shared/services/situacion-actual/session-situacion-actual.service";
import {take, takeUntil} from "rxjs/operators";
import {EstadoService} from "../../shared/services/seguimiento/estado.service";
import { ConsultaUnidadesService } from 'src/app/shared/services/seguimiento/consulta-unidades.service';

@Component({
  selector: 'app-estado-busqueda',
  templateUrl: './estado-busqueda.component.html',
  styleUrls: ['./estado-busqueda.component.css']
})
export class EstadoBusquedaComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of entidades */
  protected entidades: Entidad[] = [];

  /** control for the MatSelect filter keyword */
  public entidadFilterCtrl: FormControl = new FormControl();

  /** list of localidades filtered by search keyword */
  public filteredEntidad: ReplaySubject<Entidad[]> = new ReplaySubject<Entidad[]>(1);

  @ViewChild('singleSelectEstado', {static: true}) singleSelectEstado: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  public clues: Clues = new Clues();

  public entidad: string = null;
  public cveEntidad: string = null;
  public isGobernador = false;
  public entidadSelect: Entidad;
  private estadoStr: string = null;

  formFiltro: FormGroup = this.fb.group({
    entidadCtrl: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder, 
    private catalogoService: CatalogosService,
    private estadoService: EstadoService, 
    private sessionSituacionActualService: SessionSituacionActualService,
    private consultaService: ConsultaUnidadesService
    ) {
  }

  ngOnInit(): void {

    const estadosSession: Entidad[] = this.estadoService.getEstados();
    if ( estadosSession && estadosSession.length > 0) {
      console.log('EstadoBusquedaComponent de sesion');
      this.entidades = estadosSession;
      this.filteredEntidad.next(this.entidades.slice());
      this.seleccionaEstado();
    } else {
      console.log('EstadoBusquedaComponent de servicio');
      this.catalogoService.getEntidadesSeguimiento().subscribe(response => {
        this.entidades = response.body;
        this.filteredEntidad.next(this.entidades.slice());
        this.estadoService.setEstados(this.entidades);
        this.seleccionaEstado();
        //const entidadSelected:Entidad = JSON.parse(sessionStorage.getItem('estadoSelected'));
        /*      const entidad = this.entidades.filter(en => en.nomEntidad === this.estadoStr)[0];
              this.formFiltro.controls['entidadCtrl'].setValue(entidad);
              this.estadoService.setEstado(entidad);*/

      });
    }


    // listen for search field value changes
    this.entidadFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterEntidades();
        });

/*    this.estadoService.getEstadoStr$().subscribe(estado => {
      this.estadoStr = estado;
      console.log(' EstadoBusquedaComponent Estado que cambio', estado);
      console.log(' EstadoBusquedaComponent Entidades', this.entidades);
      if (this.entidades && this.entidades.length > 0) {
        const entidadSeleccionado: Entidad = this.entidades.filter(en => en.nomEntidad.toLowerCase() === estado.toLowerCase())[0];
        console.log(' EstadoBusquedaComponent Entidad preseleccionada', entidadSeleccionado);
        this.formFiltro.controls['entidadCtrl'].setValue(entidadSeleccionado);
      }
    });*/

    this.formFiltro.valueChanges.subscribe(value => {
      this.buscar();
      //notificamos que ha cambiado el estado
      this.consultaService.setResetFormFiltros(true);
    });
  }

  seleccionaEstado() {
    if (sessionStorage.getItem('estadoStr')) {
      this.estadoStr = sessionStorage.getItem('estadoStr');
      console.log(' EstadoBusquedaComponent Retorno de entodades', this.estadoStr);
      const entidadSelected:Entidad = this.entidades.filter(en => en.nomEntidad.toLowerCase() === this.estadoStr.toLowerCase())[0];
      console.log('EstadoBusquedaComponent Estado encontrado', entidadSelected);
      this.formFiltro.controls['entidadCtrl'].setValue(entidadSelected);
      this.estadoService.setEstado(entidadSelected);
      this.estadoService.setEstadoStr$(this.estadoStr);

    }
  }

  ngAfterViewInit(): void {
    //this.setInitialValueEntidad();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

  }


  /**
   * Sets the initial value after the filteredMunicipios are loaded initially
   */
  protected setInitialValueEntidad() {
    // console.log('Localidades -->', this.localidades);
    this.filteredEntidad
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // console.log('Localidades -->', this.localidades);
          this.singleSelectEstado.compareWith = (a: Entidad, b: Entidad) => a && b && a.cveEntidad === b.cveEntidad;
        });
  }


  protected filterEntidades() {
    if ( !this.entidades ) {
      return;
    }
    // get the search keyword
    let search = this.entidadFilterCtrl.value;
    if ( !search ) {
      this.filteredEntidad.next(this.entidades.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredEntidad.next(
        this.entidades.filter(entidad => entidad.nomEntidad.toLowerCase().indexOf(search) > -1)
    );
  }


  public buscar() {
    const estado: Entidad  = this.formFiltro.controls['entidadCtrl'].value;
    this.estadoService.setEstado(estado);
    sessionStorage.setItem('estadoStr', estado.nomEntidad);
  }

}


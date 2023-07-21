import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {takeUntil, take} from 'rxjs/operators';
import {CatalogosService} from '../../shared/services/catalogos/catalogos.service';
import {Municipio} from '../../shared/model/situacion-actual/Municipio';
import {Localidad} from '../../shared/model/situacion-actual/Localidad';
import {CluesRequest} from '../../shared/model/situacion-actual/CluesRequest';
import {Clues} from '../../shared/model/situacion-actual/Clues';
import {CluesService} from '../../shared/services/situacion-actual/clues.service';
import {Entidad} from '../../shared/model/situacion-actual/Entidad';
import {UsuarioSesion} from '../../shared/model/session/usuarioSesion';
import {Asignacion} from '../../shared/model/session/asignacion';
import {SessionSituacionActualService} from '../../shared/services/situacion-actual/session-situacion-actual.service';



@Component({
  selector: 'app-filtros-busqueda',
  templateUrl: './filtros-busqueda.component.html',
  styleUrls: ['./filtros-busqueda.component.css']
})
export class FiltrosBusquedaComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of entidades */
  protected entidades: Entidad[] = [];

  /** list of municipios */
  protected municipios: Municipio[] = [];

  /** list of localidades */
  protected localidades: Localidad[] = [];

  /** list of nivelesAtencion */
  protected nivelesAtencion: string[] = [];

  /** list of clues */
  protected listaClues: Clues[] = [];


  /** control for the MatSelect filter keyword */
  public entidadFilterCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public dataFilterCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public localidadFilterCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public nivelAtencionMultiFilterCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public cluesFilterCtrl: FormControl = new FormControl();



  /** list of localidades filtered by search keyword */
  public filteredEntidad: ReplaySubject<Entidad[]> = new ReplaySubject<Entidad[]>(1);

  /** list of municipios filtered by search keyword */
  public filteredData: ReplaySubject<Municipio[]> = new ReplaySubject<Municipio[]>(1);

  /** list of localidades filtered by search keyword */
  public filteredLocalidad: ReplaySubject<Localidad[]> = new ReplaySubject<Localidad[]>(1);

  /** list of nivelAtencion filtered by search keyword */
  public filteredNivelAtencionMulti: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  /** list of clues filtered by search keyword */
  public filteredClues: ReplaySubject<Clues[]> = new ReplaySubject<Clues[]>(1);

  @ViewChild('singleSelectEstado', { static: true }) singleSelectEstado: MatSelect;
  @ViewChild('singleSelectMunicipio', { static: true }) singleSelectMunicipio: MatSelect;
  @ViewChild('singleSelectLocalidad', { static: true }) singleSelectLocalidad: MatSelect;
  @ViewChild('singleSelectClues', { static: true }) singleSelectClues: MatSelect;
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  public clues: Clues = new Clues();

  public entidad: string = null;
  public cveEntidad: string = null;
  public isGobernador = false;
  public entidadSelect: Entidad;


  formFiltro: FormGroup = this.fb.group({
    entidadCtrl: ['', [Validators.required]],
    municipioCtrl: [''],
    localidadCtrl: [''],
    nivelAtencionCtrl: ['', [Validators.required]],
    cluesCtrl: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private catalogoService: CatalogosService,
              private cluesService: CluesService, private sessionSituacionActualService: SessionSituacionActualService) { }

  ngOnInit(): void {

    if (this.sessionSituacionActualService.isGobernador()) {
      this.entidad = this.sessionSituacionActualService.getAsignacion().entidad;
      this.cveEntidad = this.sessionSituacionActualService.getCveEntidad();
      this.isGobernador = true;
    }

    this.catalogoService.getEntidades().subscribe(response => {
      this.entidades = response.body;
      if (this.isGobernador) {
        this.entidadGobernador();
      }
      this.filteredEntidad.next(this.entidades.slice());
    });

    // listen for search field value changes
    this.entidadFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterEntidades();
        });

    this.formFiltro.controls['entidadCtrl'].valueChanges.subscribe(entidad => {
      // this.formFiltro.controls['municipioCtrl'].reset('');
      // this.formFiltro.controls['localidadCtrl'].reset('');
      // this.formFiltro.controls['nivelAtencionCtrl'].reset('');
      this.formFiltro.controls['cluesCtrl'].reset('');
      // this.municipios = [];
      // this.localidades = [];
      this.listaClues = [];
      if (entidad) {
        const cluesRequest: CluesRequest = new CluesRequest();
        console.log('Entidad en combo', entidad.cveEntidad);
        cluesRequest.cveEntidad = entidad.cveEntidad;
        cluesRequest.cveMunicipio = null;
        cluesRequest.cveLocalidad = null;
        cluesRequest.nivelesAtencion = this.formFiltro.controls['nivelAtencionCtrl'].value;
        console.log('request en combo', cluesRequest);
        this.getCluesCombo(cluesRequest);
      }
      // this.catalogoService.getMunicipios(entidad.cveEntidad).subscribe(response => {
        // this.municipios = [];
        // load the initial municipios list
        // this.municipios = response.body;
        // this.filteredData.next(this.municipios.slice());
      // });
    });

    // listen for search field value changes
    this.dataFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMunicipios();
        });

    this.catalogoService.getNivelesAtencion().subscribe(resp => {
      this.nivelesAtencion = resp.body;
      console.log('Niveles', this.nivelesAtencion[0]);
      this.formFiltro.controls['nivelAtencionCtrl'].setValue([this.nivelesAtencion[0], this.nivelesAtencion[1], this.nivelesAtencion[2]]);
      this.filteredNivelAtencionMulti.next(this.nivelesAtencion.slice());
    });

    // listen for search field value changes
    this.nivelAtencionMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterNivelAtencionMulti();
        });

    this.formFiltro.controls['nivelAtencionCtrl'].valueChanges.subscribe(nivelSelec => {
      this.listaClues = [];
      this.formFiltro.controls['cluesCtrl'].reset('');
      this.entidadSelect = this.formFiltro.controls['entidadCtrl'].value;
      const cluesRequest: CluesRequest = new CluesRequest();
      console.log('Entidad', this.entidadSelect.cveEntidad);
      cluesRequest.cveEntidad = this.entidadSelect.cveEntidad;
      cluesRequest.cveMunicipio = null;
      cluesRequest.cveLocalidad = null;
      cluesRequest.nivelesAtencion = nivelSelec;
      if (nivelSelec) {
        console.log('request', cluesRequest);
        /*this.catalogoService.getCluesSituacionActual(cluesRequest).subscribe(resp => {
          this.formFiltro.controls['cluesCtrl'].reset('');
          this.listaClues = [];
          // load the initial localidades list
          this.listaClues = resp;
          this.filteredClues.next(this.listaClues.slice());
        });*/
        this.getCluesCombo(cluesRequest);
      }
    });


    // listen for search field value changes
    this.cluesFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterClues();
        });
  }

  protected getCluesCombo(cluesRequest: CluesRequest) {
    this.catalogoService.getCluesSituacionActual(cluesRequest).subscribe(resp => {
      this.formFiltro.controls['cluesCtrl'].reset('');
      this.listaClues = [];
      // load the initial localidades list
      this.listaClues = resp;
      console.log('Lista Clues', this.listaClues);
      this.filteredClues.next(this.listaClues.slice());
    });
  }

  ngAfterViewInit(): void {
    this.setInitialValueEntidad();
    // this.setInitialValue();
    // this.setInitialValueLocalidad();
    this.setInitialValueNivelAtencion();
    this.setInitialValueClues();
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

  /**
   * Sets the initial value after the filteredMunicipios are loaded initially
   */
  protected setInitialValue() {
    this.filteredData
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.singleSelectMunicipio.compareWith = (a: Municipio, b: Municipio) => a && b && a.cveMunicipio === b.cveMunicipio;
        });
  }

  /**
   * Sets the initial value after the filteredLocalidad are loaded initially
   */
  protected setInitialValueLocalidad() {
    this.filteredLocalidad
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.singleSelectLocalidad.compareWith = (a: Localidad, b: Localidad) => a && b && a.cveLocalidad === b.cveLocalidad;
        });
  }

  /**
   * Sets the initial value after the filteredNivelAtencion are loaded initially
   */
  protected setInitialValueNivelAtencion() {
    this.filteredNivelAtencionMulti
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.multiSelect.compareWith = (a: string, b: string) => a && b && a === b;
        });
  }

  /**
   * Sets the initial value after the filteredClues are loaded initially
   */
  protected setInitialValueClues() {
    this.filteredClues
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.singleSelectClues.compareWith = (a: Clues, b: Clues) => a && b && a.clue === b.clue;
        });
  }

  protected filterEntidades() {
    if (!this.entidades) {
      return;
    }
    // get the search keyword
    let search = this.entidadFilterCtrl.value;
    if (!search) {
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

  protected filterMunicipios() {
    if (!this.municipios) {
      return;
    }
    // get the search keyword
    let search = this.dataFilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.municipios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredData.next(
        this.municipios.filter(municipio => municipio.nomMunicipio.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterLocalidades() {
    if (!this.localidades) {
      return;
    }
    // get the search keyword
    let search = this.localidadFilterCtrl.value;
    if (!search) {
      this.filteredLocalidad.next(this.localidades.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredLocalidad.next(
        this.localidades.filter(localidad => localidad.nomLocalidad.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterNivelAtencionMulti() {
    if (!this.nivelesAtencion) {
      return;
    }
    // get the search keyword
    let search = this.nivelAtencionMultiFilterCtrl.value;
    if (!search) {
      this.filteredNivelAtencionMulti.next(this.nivelesAtencion.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredNivelAtencionMulti.next(
        this.nivelesAtencion.filter(nivel => nivel.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterClues() {
    if (!this.listaClues) {
      return;
    }
    // get the search keyword
    let search = this.cluesFilterCtrl.value;
    if (!search) {
      this.filteredClues.next(this.listaClues.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredClues.next(
        this.listaClues.filter(clues => clues.clue.toLowerCase().indexOf(search) > -1)
    );
  }

  public buscar() {
    this.cluesService.setClues(this.formFiltro.controls['cluesCtrl'].value);
  }


  public limpiar(): void {
    this.formFiltro.controls['entidadCtrl'].reset('');
    this.formFiltro.controls['municipioCtrl'].reset('');
    // this.formFiltro.controls['nivelAtencionCtrl'].reset('');
    this.listaClues = [];
    this.formFiltro.controls['cluesCtrl'].reset('');
    this.listaClues = [];
    this.filteredClues.next(this.listaClues.slice());
    if (this.isGobernador) {
      this.entidadGobernador();
    }
    this.cluesService.setClues(this.clues);
  }


  public entidadGobernador() {
    const entidadGob =  this.entidades.filter( entidad => {
      return entidad.nomEntidad.toLowerCase() === this.entidad.toLowerCase();
    })[0];
    this.formFiltro.controls['entidadCtrl'].setValue(entidadGob);
  }


}

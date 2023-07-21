import { EquipamientoDetalle } from "./../../shared/model/situacion-actual/equipamiento-detalle.model";
import { RecursoMaterialGeneral } from "./../../shared/model/situacion-actual/recurso-material-general.model";
import { UsuarioSesion } from "./../../shared/model/session/usuarioSesion";
import { AutenticacionService } from "./../../shared/services/autenticacion/autenticacion.service";
import { RecursoMaterialGeneralService } from "./../../shared/services/situacion-actual/recurso-material-general.service";
import { Component, OnInit } from "@angular/core";
import { CluesService } from "src/app/shared/services/situacion-actual/clues.service";

@Component({
  selector: "app-recursos-materiales-general",
  templateUrl: "./recursos-materiales-general.component.html",
  styleUrls: ["./recursos-materiales-general.component.css"],
})
export class RecursosMaterialesGeneralComponent implements OnInit {
  userSession: UsuarioSesion;
  recMatGen: RecursoMaterialGeneral;
  recMatGenDet: EquipamientoDetalle = null;
  clueRef: string;
  msgMetrica: string;

  constructor(
    private _httpRecMatGen: RecursoMaterialGeneralService,
    private _session: AutenticacionService,
    private clueService: CluesService
  ) {}

  ngOnInit(): void {
    this.recMatGen = new RecursoMaterialGeneral();
    this.userSession = this._session.usuarioSesion;
    this.clueService.getClues$().subscribe(
      (clue) => {
        if (clue) {
          this.clueRef = clue.refClues;
          this.cargarEquipamiento();
        }
      },
      (err: any) => {
        console.log(
          "Error en el servcio clueService para obtener la refClue",
          err
        );
      }
    );
  }

  /* Cargar tabla de equipamiento */
  cargarEquipamiento(): void {
    this._httpRecMatGen
      .getRecursosMateriales(this.clueRef)
      .subscribe(
        (data) => {
          this.recMatGen = data;
        },
        (err) => {
          console.log(
            "Error al cargar los equipos",
            err
          );
        }
      );
  }

  /* Cargar detalles de equipos */
  cargarRecMatGen(e: string): void {
    this._httpRecMatGen.getRecursosMaterialesDetalle(this.clueRef, e).subscribe(
        (data) => {
          this.msgMetrica = e;
          this.recMatGenDet = data;
        },
        (err) => {
          console.log(
            "Error al cargar el detalle del equipo",
            err
          );
        }
      );
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DetallePlanAcciones } from "src/app/shared/model/situacion-actual/PlanAcciones";
import { PlanAccionesService } from "src/app/shared/services/situacion-actual/plan-acciones.service";
import { DialogoActividadesComponent } from "../dialogo-actividades/dialogo-actividades.component";

@Component({
  selector: "app-card-concepto",
  templateUrl: "./card-concepto.component.html",
  styleUrls: ["./card-concepto.component.css"],
})
export class CardConceptoComponent implements OnInit {
  @Input() estatus: string;
  @Input() concepto: string;
  @Input() imagen: string;
  @Input() planAcciones: DetallePlanAcciones[];
  actividadesPorConcepto: DetallePlanAcciones[] = [];
  tipoImagen: string = "";

  constructor(
    private planAccionesService: PlanAccionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tipoImagen = this.concepto.toLowerCase().replace(/\s+/g, "");
    this.tipoImagen += ".svg";
    this.imagen += this.tipoImagen;
  }

  getActividadesPorConcepto(concepto: string) {
    this.actividadesPorConcepto = [];
    this.actividadesPorConcepto =
      this.planAccionesService.getActividadesPorConcepto(
        this.planAcciones,
        concepto
      );
    this.muestraModalActividades();
  }

  muestraModalActividades() {
    this.dialog.open(DialogoActividadesComponent);
    localStorage.removeItem("actividadesPorConcepto");
    localStorage.removeItem("imagen");
    localStorage.removeItem("concepto");
    localStorage.removeItem("textoEstatus");

    localStorage.setItem(
      "actividadesPorConcepto",
      JSON.stringify(this.actividadesPorConcepto)
    );
    localStorage.setItem("imagen", this.formateaTipoImagen(this.imagen));
    localStorage.setItem("concepto", this.concepto);
    localStorage.setItem("textoEstatus", this.estatus);
  }

  formateaTipoImagen(imagen: string): string {
    return imagen.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

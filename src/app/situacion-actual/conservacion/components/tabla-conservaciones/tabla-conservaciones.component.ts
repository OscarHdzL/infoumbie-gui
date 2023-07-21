import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Equipo } from "src/app/shared/model/situacion-actual/Conservacion";

@Component({
  selector: "app-tabla-conservaciones",
  templateUrl: "./tabla-conservaciones.component.html",
  styleUrls: ["./tabla-conservaciones.component.css"],
})
export class TablaConservacionesComponent implements OnInit {
  @Input() datosConservaciones: Equipo[] = [];
  @Output() filtroSeleccionado = new EventEmitter<string>();
  formFiltro = this.fb.group({
    filtro: [""],
  });
  hayFiltro: boolean = false;
  filtro: string = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  cargaFiltro(filtro: string) {
    this.filtro = filtro;
    this.filtroSeleccionado.emit(filtro);
    this.hayFiltro = true;
  }

  limpiarFiltro() {
    this.filtro = "";
    this.formFiltro.reset();
    this.filtroSeleccionado.emit(null);
    this.hayFiltro = false;
  }
}

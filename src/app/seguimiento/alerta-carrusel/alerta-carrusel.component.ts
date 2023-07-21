import { AlertaService } from "src/app/shared/services/seguimiento/alerta.service";
import { Entidad } from "./../../shared/model/situacion-actual/Entidad";
import { Subscription } from "rxjs";
import { Alerta } from "src/app/shared/model/seguimiento/alerta";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NAVEGACION } from "src/app/shared/constants/navigation";
import { EstadoService } from "src/app/shared/services/seguimiento/estado.service";

declare var $: any;

@Component({
  selector: "app-alerta-carrusel",
  templateUrl: "./alerta-carrusel.component.html",
  styleUrls: ["./alerta-carrusel.component.css"],
})
export class AlertaCarruselComponent implements OnInit, OnDestroy {
  /* Carrusel */
  private interval;
  private posicionAlerta: number = 0;
  private alertas: Alerta[] = [];
  alerta: string = "Cargando...";

  private subscEstado: Subscription;
  private subscAlerta: Subscription;

  constructor(
    private router: Router,
    private servEstado: EstadoService,
    private servAlerta: AlertaService
  ) {}

  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.subscEstado) this.subscEstado.unsubscribe();
    if (this.subscAlerta) this.subscAlerta.unsubscribe();
  }

  ngOnInit(): void {
    //this.initCarrusel();
    this.cargarEstado();
  }

  private cargarEstado(): void {
    this.subscEstado = this.servEstado.getEstado$().subscribe(
      (resp) => {
        if (resp) {
          this.cargarAlertas(resp);
        }
      },
      (err: any) => {}
    );
  }

  private cargarAlertas(ent: Entidad): void {
    const body = {
      cveEntidad: ent.cveEntidad,
    };

    this.subscAlerta = this.servAlerta.getAlertasActivas(body).subscribe(
      (resp) => {
        this.alertas = resp;
        if (resp.length > 1) {
          this.initCarrusel();
        } else if (resp.length == 1) {
          this.alerta = this.formatAlerta(this.alertas[0].desTitulo);
        } else {
          this.alerta = "Sin alertas activas.";
        }
      },
      (err: any) => {
        console.log("⚠ Error al cargar alertas activas", err);
      }
    );
  }

  initCarrusel() {
    this.alerta = this.formatAlerta(
      this.alertas[this.posicionAlerta].desTitulo
    );
    this.posicionAlerta++;
    this.interval = setInterval(() => {
      var div = $("#alerta");
      if (this.posicionAlerta >= this.alertas.length) {
        this.posicionAlerta = 0;
      }
      div.animate({ opacity: "0" }, 0);
      div.animate({ opacity: "1" }, "slow");
      this.alerta = this.formatAlerta(
        this.alertas[this.posicionAlerta].desTitulo
      );
      this.posicionAlerta++;
    }, 5000);
  }

  public irDetAlertas(): void {
    this.router.navigate([NAVEGACION.detalleAlertas]);
  }

  private formatAlerta(alerta: string): string {
    return alerta.length < 35 ? alerta : alerta.substring(0, 35) + "...";
  }
}

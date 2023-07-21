import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { PermisosService } from "../services/autenticacion/permisos.service";

@Directive({
  selector: "[appHiddenSwitch]",
})
export class HiddenSwitchDirective implements OnInit {
  @Input() permission: string = "";
  hasPermission: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private permisosService: PermisosService
  ) {}

  ngOnInit(): void {
    this.hasPermission = this.permisosService.hasPermiso(this.permission);
    this.deshabilitaComponente(this.hasPermission);
  }

  deshabilitaComponente(permission: boolean) {
    if (!permission) {
      this.renderer2.addClass(this.elementRef.nativeElement, "hidden");
    }
  }
}

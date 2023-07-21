import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from "@angular/core";
import { PermisosService } from "../services/autenticacion/permisos.service";

@Directive({
  selector: "[appDisabled]",
})
export class DisabledDirective implements DoCheck {
  @Input() permission: string = "";
  @Input() permissionComponent: string = "";
  hasPermission: boolean = false;
  hasPermissionComponent: boolean = false;
  @Output() permisoHabilitado = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private permisosService: PermisosService
  ) {}

  ngDoCheck(): void {
    this.hasPermission = this.permisosService.hasPermiso(this.permission);
    this.hasPermissionComponent = this.permisosService.hasPermisoComponente(
      this.permissionComponent
    );
    this.permisoHabilitado.emit(this.hasPermission);
    this.habilitarComponente();
    this.deshabilitaComponente(this.hasPermission, this.hasPermissionComponent);
  }

  habilitarComponente() {
    this.renderer2.removeAttribute(this.elementRef.nativeElement, "disabled");
  }

  deshabilitaComponente(permission: boolean, permissionComponent: boolean) {
    if (this.permission.length > 0) {
      if (!permission) {
        this.renderer2.setAttribute(
          this.elementRef.nativeElement,
          "disabled",
          "true"
        );
      }
    }

    if (this.permission.length > 0 && this.permissionComponent.length > 0) {
      if (!permission || !permissionComponent) {
        this.renderer2.setAttribute(
          this.elementRef.nativeElement,
          "disabled",
          "true"
        );
      }
    }
  }
}

import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { ROLES } from 'src/app/shared/constants/global';
import { AutenticacionService } from '../services/autenticacion/autenticacion.service';

@Directive({
   selector: '[appHasRole]'
})
export class HasRoleDirective {

   constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authSvc : AutenticacionService) { }

   @Input() set appHasRole(permissions: Array<string>) {
      if (this.authSvc.hasRole(permissions)) {
         this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
         this.viewContainer.clear();
      }
   }

}

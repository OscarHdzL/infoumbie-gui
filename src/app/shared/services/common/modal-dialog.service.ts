import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalDialogType } from '../../common-components/modal-dialog/integration/dto/modalDialogType';

@Injectable({
   providedIn: 'root'
})
export class ModalDialogService {

   private listener$ : Subject<ModalDialogType>;

   constructor() { 
      this.listener$ = new Subject<ModalDialogType>();
   }

   get _listener() : Observable<ModalDialogType> {
      return this.listener$.asObservable();
   }

   showDialog(type : string = "info", title : string = "", message : string = "", callback : (boolean) => any = null, img : string = "", alerta : boolean = false) {
      let self = this;
      this.listener$.next({
         type: type, //info, confirm, tooltip
         title: title,
         text: message,
         imgSrc: img,
         confirm: function () { self.listener$.next(); callback(true); },
         reject: function () { self.listener$.next(); callback(false); },
         dismiss: function () { self.listener$.next(); },
         alerta
      });
   }

}

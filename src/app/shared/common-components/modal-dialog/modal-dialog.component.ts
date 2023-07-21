import { Component, OnInit } from '@angular/core';
import { ModalDialogService } from '../../services/common/modal-dialog.service';
import { ModalDialogType } from './integration/dto/modalDialogType';

@Component({
   selector: 'app-modal-dialog',
   templateUrl: './modal-dialog.component.html',
   styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

   modalDlg : ModalDialogType;

   constructor(private dlgSvc : ModalDialogService) { }

   ngOnInit(): void {
      this.dlgSvc._listener.subscribe(modal => this.modalDlg = modal);
   }

}
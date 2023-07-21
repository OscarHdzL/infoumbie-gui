import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-cancelacion-comentario',
  templateUrl: './modal-cancelacion-comentario.component.html',
  styleUrls: ['./modal-cancelacion-comentario.component.scss']
})
export class ModalCancelacionComentarioComponent implements OnInit {

  @ViewChild('closeModal') closeModal;
  @Input() entrada: any;
  @Output() messageEvent = new EventEmitter<boolean>();


  infoArea: any;

  constructor(
  ) {
   }

  ngOnInit() {
    
  }

  aceptar(){
    this.messageEvent.emit(true);
  }

  cancelar(){
    this.messageEvent.emit(false);
  }
  
}

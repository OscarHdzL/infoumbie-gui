import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-carrusel',
  templateUrl: './modal-carrusel.component.html',
  styleUrls: ['./modal-carrusel.component.css']
})
export class ModalCarruselComponent implements OnInit {
  public slideModal = 1;
  public slidesModal:any;
  public totalModal:number ;
  constructor(
    public dialogRef: MatDialogRef<ModalCarruselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    
    console.log('DATOS VISITA', this.data)
  }
  ngAfterViewInit(){
 
    this.slidesModal = document.querySelectorAll(".slider-modal ul li");
   
    this.totalModal = this.slidesModal?.length;

    this.showSlideModal(this.slideModal);
  }

  siguienteModal(event:any){
    this.slideModal++;
    if (this.slideModal > this.totalModal) { this.slideModal = this.totalModal; }
    this.showSlideModal(this.slideModal);
}

atrasModal(event: any){
    this.slideModal--;
    if (this.slideModal < 1) { this.slideModal = 1; }
    this.showSlideModal(this.slideModal);
}

  showSlideModal(n:number) {
    n--; // decrement 1
    for (let i = 0; i < this.slidesModal.length; i++) {
        (i == n) ? this.slidesModal[n].style.display = "block" : this.slidesModal[i].style.display = "none";
    }
  }



}

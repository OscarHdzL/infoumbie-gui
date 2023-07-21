import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from 'src/app/shared/services/common/modal-dialog.service';

@Component({
  selector: 'app-admin-carga-masiva',
  templateUrl: './admin-carga-masiva.component.html',
  styleUrls: ['./admin-carga-masiva.component.css']
})
export class AdminCargaMasivaComponent implements OnInit {

  formCarga: FormGroup;

  listaNivel = [{id:1, nombre: 'Primer Nivel'},{id:2,nombre:'Segundo Nivel'}];
  nombreArchivo;

  constructor(
    private formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService, 
    ) { }

  ngOnInit(): void {
    this.crearFormularioDescarga();
  }

  
  private crearFormularioDescarga(){
    this.formCarga = this.formBuilder.group({
        nivelAtencion: [0, Validators.compose([Validators.required])],
        tipoArchivo: [null, Validators.compose([Validators.required])]
    });
  }

  cargarArchivo(a: HTMLElement) {
    console.log(a);
    a.click();
  }

  codificarDocumento(ev: any) {
    if (ev.target.files) {
      let f: File = ev.target.files.item(0);

      if (f.size < 5044652) {

        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => {
          ev.target.value = '';
          let stream = reader.result as string;
          let block = stream.split(";");
          this.nombreArchivo=f.name;
        };
      } else {
        let mensaje =
          'El tamaño del archivo excede de 5MB, no es posible cargarlo';
         this.modalDialogService.showDialog('Atención', "Atención", mensaje, () => { });
      }
    }
  }

}

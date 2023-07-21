import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { APIs } from '../../constants/endpoints';
import {String} from "typescript-string-operations";
import {Comentarios, Documentos, ResponseDetalleComentarios} from "../../model/seguimiento/comentarios";
import { ArrayEvidencias } from '../../model/seguimiento/alertas';


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  getComentarios(cveClue: number): Observable<any[]> {
    return this.http.get(String.Format(APIs.seguimiento.unidadesComentarios, cveClue))
      .pipe(
        tap((comentarios: ResponseDetalleComentarios[]) => {
          let arrayComentarios: ResponseDetalleComentarios[] = [];
          if(comentarios.length > 0){
            comentarios.forEach(comentario => {

              let auxComentario: ResponseDetalleComentarios = new ResponseDetalleComentarios();
               auxComentario = comentario;
               auxComentario.contieneImgs = this.validarTipoArchivo(comentario.documentos);
          
               arrayComentarios.push(auxComentario);
            });
          }else{
            let auxComentario: ResponseDetalleComentarios = new ResponseDetalleComentarios();
            auxComentario.contieneImgs = false;
            arrayComentarios.push(auxComentario);
          }

          return arrayComentarios;
        
        })
      );
  }

  private validarTipoArchivo(arreglo: Documentos []): boolean{
    let bandera: boolean = false;
    if(arreglo && arreglo.length > 0){
        arreglo.map(archivo=>{
          //Validamos si las evidencias de la alerta son imagenes
          if(archivo.nomArchivo.includes('jpg') || archivo.nomArchivo.includes('png') || archivo.nomArchivo.includes('jpeg')){
            bandera = true;
          }else{
            bandera = false;
          }
        });
    }else{
      bandera = false;
    }
    
    return bandera;
    
  }

  sendPost(body: FormData): Observable<any> {
    return this.http.post(APIs.seguimiento.unidadesComentarios, body)
  }

    /**
     *
     */
  public guardaComentario(comentario: Comentarios):Observable<Comentarios> {
      console.log('Comentario', comentario);
      return this.http.post<Comentarios>(APIs.seguimiento.guardaComentario, comentario);
  }
} 

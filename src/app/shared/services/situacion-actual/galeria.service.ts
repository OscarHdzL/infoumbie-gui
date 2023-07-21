import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CarpetaAnio, DetalleMes, UrlImagen } from '../../model/situacion-actual/imagenes';
import { SharePointService } from './share-point.service';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService extends SharePointService{

  private meses: DetalleMes[] =[
    {
      nomFront:'Enero',
      nomApi:'',
      numero:1,
      abrev: 'En',
      files:0
    },
    {
      nomFront:'Febrero',
      nomApi:'',
      numero:2,
      abrev: 'Fe',
      files:0
    },
    {
      nomFront:'Marzo',
      nomApi:'',
      numero:3,
      abrev: 'Mar',
      files:0
    },
    {
      nomFront:'Abril',
      nomApi:'',
      numero:4,
      abrev: 'Ab',
      files:0
    },
    {
      nomFront:'Mayo',
      nomApi:'',
      numero:5,
      abrev: 'May',
      files:0
    },
    {
      nomFront:'Junio',
      nomApi:'',
      numero:6,
      abrev: 'Jun',
      files:0
    },
    {
      nomFront:'Julio',
      nomApi:'',
      numero:7,
      abrev: 'Jul',
      files:0
    },
    {
      nomFront:'Agosto',
      nomApi:'',
      numero:8,
      abrev: 'Ag',
      files:0
    },
    {
      nomFront:'Septiembre',
      nomApi:'',
      numero:9,
      abrev: 'Sep',
      files:0
    },
    {
      nomFront:'Octubre',
      nomApi:'',
      numero:10,
      abrev: 'Oct',
      files:0
    },
    {
      nomFront:'Noviembre',
      nomApi:'',
      numero:11,
      abrev: 'Nov',
      files:0
    },
    {
      nomFront:'Diciembre',
      nomApi:'',
      numero:12,
      abrev: 'Dic',
      files:0
    },
  ];

  private idCarpetaDoc = 'b!lcTUzwARb0eEatVqW6Oqrcc2tf8h9NxOh9iFN7Th53SSs7xoc86TQZXyXw2NTq6G';

  constructor(
    public http: HttpClient
  ) { 
    super(http);
  }

  public getCarpetasAnio(ruta: string): Observable<CarpetaAnio[]>{
    return this.get<any>(`${environment.urlSharePoint}/${environment.siteSharePoint}/drives/${this.idCarpetaDoc}/root:/${ruta}:/children`)
    .pipe(
      map(response =>{
        let listaCarpetasAnio: CarpetaAnio[] = [];
        try{
          response.value.forEach(anio => {
            let detCarpetaAnio: CarpetaAnio = new CarpetaAnio();
            detCarpetaAnio.id = anio['id'];
            detCarpetaAnio.name = anio['name'];
            listaCarpetasAnio.push(detCarpetaAnio);
          })
        }catch(error){
          console.log(error);
          throw  throwError('Error al generar la respuesta del servicio para obtener la lista de años');
        }
  
        return listaCarpetasAnio.sort((a, b) => a.name.localeCompare(b.name));
      })
    )
  }

  public getMeses(ruta: string, anio: string) :Observable<DetalleMes []>{
    return this.get<any>(`${environment.urlSharePoint}/${environment.siteSharePoint}/drives/${this.idCarpetaDoc}/root:/${ruta}/${anio}:/children`)
    .pipe(
      map((response: any) =>{
        let meses: DetalleMes[] = [];
        try{
          this.meses.forEach(mes => {
            
            let detalleMes= new DetalleMes();
   
           // let numeroMes = response.value.filter(mes => mes.name.toUpperCase() === mes.abrev.toUpperCase());
           // let columna = response.value.filter(columna => columna.name.toLowerCase() === mes.nomFront.toLowerCase())[0];
           let columna = response.value.filter(columna => columna.name.toLowerCase() === mes.nomFront.toLowerCase())[0];
            detalleMes.nomFront = mes.nomFront;
            detalleMes.nomApi = (columna?.name === undefined) ? '' : columna?.name;
            detalleMes.numero = mes.numero;
            detalleMes.abrev = mes.abrev;
            detalleMes.files = (columna?.folder?.childCount === undefined) ? 0 : columna?.folder?.childCount;
            meses.push(detalleMes);
          
          })
        }catch(error){
          console.log(error);
          throw  throwError('Error al generar la respuesta del servicio para obtener la lista de meses');
        }
        return meses;
      })
    )
  }
  public getUrlImagenes(ruta: string, anio: string, mes: string): Observable<UrlImagen[]> {
    return this.get<any>(`${environment.urlSharePoint}/${environment.siteSharePoint}/drives/${this.idCarpetaDoc}/root:/${ruta}/${anio}/${mes}:/children`)
    .pipe(
      map(resp => {
        let listaUrlImagenes: UrlImagen[] = [];
        try{
  
          resp.value.forEach(url => {
            let detUrlImagen: UrlImagen= new UrlImagen();
            detUrlImagen.url = url['@microsoft.graph.downloadUrl'];
           // detUrlImagen.url = this.getImagenes(url['@microsoft.graph.downloadUrl']);
            listaUrlImagenes.push(detUrlImagen);
          })
        }catch(error){
          console.log(error);
          throw  throwError('Error al generar la respuesta del servicio para obtener las urls de las imagenes');
        }
      
        return listaUrlImagenes;
      })
    )
  }

  public get_Meses(){
    return this.meses;
  }

  public getImagenes(link: string) {
    return this.http.get(`${link}`, { observe: 'response', responseType: 'blob' })
   
  }
}

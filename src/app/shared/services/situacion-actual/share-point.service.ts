import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import { HttpService } from '../common/http.service';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharePointService extends HttpService{

  constructor(public http: HttpClient) { 
    super();
  }

  protected get<T>(url: string, indexHeader: boolean = false): Observable<T>{
    let options = {headers: this.getHeaders(indexHeader)};
    return this.http.get<T>(url, options);
  }
  
  private getHeaders(indexHeader: boolean = false){
    let token = sessionStorage.getItem('token-sharePoint');
    console.log('Token', token);
    let header = new HttpHeaders().set(
        "Authorization",
         'bearer '+ token
      );

    if (indexHeader) {
      console.log('Asignando Prefer');
      header = header.append("Prefer", 'allowthrottleablequeries');
    }

    console.log('Header', header);

    return header;
  }

  protected getData(filters: { idLista:string; fields:string[]; refClues: string }) {
    let select = filters.fields.reduce((valor, field) => {
      if (valor === '') {
        valor = field;
      } else {
        valor = valor + "," + field;
      }
      return valor;
    }, '');
    let params = `?expand=fields(select=${select})&$filter=(fields/Title eq \'${filters.refClues}\')`
    let urlListas = `${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${filters.idLista}/items${params}`;

    console.log('Parametros', params);
    console.log('urlListas', urlListas);

    return this.get(urlListas, true);
  }

  protected getDataAndColumns(filters: { idLista:string; fields:string[]; refClues: string }) {
    let select = filters.fields.reduce((valor, field) => {
      if (valor === '') {
        valor = field;
      } else {
        valor = valor + "," + field;
      }
      return valor;
    }, '');
    let urlColumnas = `${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${filters.idLista}/columns`;
    let params = `?expand=fields(select=${select})&$filter=(fields/Title eq \'${filters.refClues}\')`;
    let urlListas = `${environment.urlSharePoint}/${environment.siteSharePoint}/lists/${filters.idLista}/items${params}`;

    return forkJoin([this.get(urlColumnas), this.get(urlListas, true)]);
  }

}

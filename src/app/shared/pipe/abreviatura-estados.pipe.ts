import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abreviaturaEstados'
})
export class AbreviaturaEstadosPipe implements PipeTransform {

  transform(value: string, args: string | null): string {

    const estadosAbreviados: any[] = [
{ nomEstado: 'Aguascalientes',	abreviatura: 'Ags.' },
{ nomEstado: 'Baja California',	abreviatura: 'B.C.'},
{ nomEstado: 'Baja California Sur',	abreviatura: 'B.C.S.'},
{ nomEstado: 'Campeche',	abreviatura: 'Camp.'},
{ nomEstado: 'Coahuila',	abreviatura: 'Coah.'},
{ nomEstado: 'Colima',	abreviatura: 'Col.'},
{ nomEstado: 'Chiapas',	abreviatura: 'Chis.'},
{ nomEstado: 'Chihuahua',	abreviatura: 'Chih.'},
{ nomEstado: 'CDMX',	abreviatura: 'CDMX.'},
{ nomEstado: 'Ciudad de Mexico',	abreviatura: 'CDMX.'},
{ nomEstado: 'Durango',	abreviatura: 'Dgo.'},
{ nomEstado: 'Guanajuato',	abreviatura: 'Gto.'},
{ nomEstado: 'Guerrero',	abreviatura: 'Gro.'},
{ nomEstado: 'Hidalgo',	abreviatura: 'Hgo.'},
{ nomEstado: 'Jalisco',	abreviatura: 'Jal.'},
{ nomEstado: 'Estado de Mexico',	abreviatura: 'Mex.'},
{ nomEstado: 'Mexico',	abreviatura: 'Mex.'},
{ nomEstado: 'Michoacán',	abreviatura: 'Mich.'},
{ nomEstado: 'Michoacan',	abreviatura: 'Mich.'},
{ nomEstado: 'Morelos',	abreviatura: 'Mor.'},
{ nomEstado: 'Nayarit',	abreviatura: 'Nay.'},
{ nomEstado: 'Nuevo León',	abreviatura: 'N.L.'},
{ nomEstado: 'Nuevo Leon',	abreviatura: 'N.L.'},
{ nomEstado: 'Oaxaca', abreviatura: 'Oax.'},
{ nomEstado: 'Puebla',	abreviatura: 'Pue.'},
{ nomEstado: 'Querétaro',	abreviatura: 'Qro.'},
{ nomEstado: 'Queretaro',	abreviatura: 'Qro.'},
{ nomEstado: 'Quintana Roo',	abreviatura: 'Q.Roo.'},
{ nomEstado: 'San Luis Potosí',	abreviatura: 'S.L.P.'},
{ nomEstado: 'San Luis Potosi',	abreviatura: 'S.L.P.'},
{ nomEstado: 'Sinaloa',	abreviatura: 'Sin.'},
{ nomEstado: 'Sonora',	abreviatura: 'Son.'},
{ nomEstado: 'Tabasco',	abreviatura: 'Tab.'},
{ nomEstado: 'Tamaulipas',	abreviatura: 'Tams.'},
{ nomEstado: 'Tlaxcala',	abreviatura: 'Tlax.'},
{ nomEstado: 'Veracruz',	abreviatura: 'Ver.'},
{ nomEstado: 'Yucatan',	abreviatura: 'Yuc.'},
{ nomEstado: 'Zacatecas',	abreviatura: 'Zac.'}
    ]

    estadosAbreviados.forEach(data => {
      if(data.nomEstado === value){
        value = data.abreviatura
      }
    })
    return value;
  }

}

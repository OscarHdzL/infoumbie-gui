export interface AreaMedica {
    camas:             Descripcion[];
    lista:             Descripcion[];
    totalCamas:        number;
    totalConsultorios: number;
    totalGenerales:    number;
}
 export class Camas{
    public camasCensables: number = 0;
    public camasNoCensables: number = 0;
    public cuidadosIntensivos: number = 0;
    public totalCamas: number = 0;
    public totalConsultorios: number = 0;
    public totalGenerales: number = 0;
 }

export interface Descripcion {
    metrica: string;
    conteo:  number;
    tipo:    string;
}

export class ServiciosAgrupados{
    public tipoServicio: string;
    public total: number;
    public informacion: InformacionServicio[];
}

export class InformacionServicio{
    public nombre: string;
    public cantidad: number;
}
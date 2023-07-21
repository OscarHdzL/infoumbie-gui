export class OfertaServicio {
    public camasCensables?: number;
    public camasNoCensables?: number;
    public totalCamas?: string;
    public especialidades?: string;
}

export class DetalleServicios{
    public tipoServicio?: string;
    public nombreConsultorio?: string;
    public totalConsultorio?: number;
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
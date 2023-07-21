export class UrgenciaGinecologicasCie10 {

    idCie10UrgenciaGinecologica? : number;
	idUrgenciasGinecologicas? : number;
    idCie10? : number;
	refCie10? : string;
	urgenciaGinecologica: string;

    public constructor(init?: Partial<UrgenciaGinecologicasCie10>) {
        Object.assign(this, init);
    }
    
}
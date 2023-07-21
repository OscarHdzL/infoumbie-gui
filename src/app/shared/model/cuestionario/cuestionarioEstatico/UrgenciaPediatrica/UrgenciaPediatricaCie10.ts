export class UrgenciaPediatricaCie10 {

    idCie10UrgenciaPediatrica? : number;
	idUrgenciasPediatricas? : number;
    idCie10? : number;
	refCie10? : string;
	urgenciaPediatrica: string;

    public constructor(init?: Partial<UrgenciaPediatricaCie10>) {
        Object.assign(this, init);
    }
    
}
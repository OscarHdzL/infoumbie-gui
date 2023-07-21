export class UrgenciaMedicaCie10 {

    idCie10UrgenciaMedica? : number;
	idUrgenciasMedicas? : number;
    idCie10? : number;
	refCie10? : string;
	urgenciaMedica: string;

    public constructor(init?: Partial<UrgenciaMedicaCie10>) {
        Object.assign(this, init);
    }
    
}
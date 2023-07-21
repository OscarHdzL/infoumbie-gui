export class UrgenciaQuirurgicasCie10 {

    idCie10UrgenciaQuirurgica? : number;
	idUrgenciasQuirurgicas? : number;
    idCie10? : number;
	refCie10? : string;
	urgenciaQuirurgica: string;

    public constructor(init?: Partial<UrgenciaQuirurgicasCie10>) {
        Object.assign(this, init);
    }
    
}
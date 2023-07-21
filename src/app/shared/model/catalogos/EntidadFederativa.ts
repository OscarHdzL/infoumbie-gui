export class EntidadFederativa {

    idEntidad? : number;
    descripcion? : string;
    idClues? : number;

    public constructor(init?: Partial<EntidadFederativa>) {
        Object.assign(this, init);
    }
}

export class Clue {    
    clave: number;
    eferencia: string;
    nombre: string;
    modulo: number;
    
    public constructor(init?: Partial<Clue>) {
        Object.assign(this, init);
    }
}


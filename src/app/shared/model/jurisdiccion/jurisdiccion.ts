export class Jurisdiccion {

    idJurisdiccion?: number;
    nombreJurisdiccion? : string;

    public constructor(init?: Partial<Jurisdiccion>) {
        Object.assign(this, init);
    }
}
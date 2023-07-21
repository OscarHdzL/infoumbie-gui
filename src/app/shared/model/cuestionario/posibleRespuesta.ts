export class PosibleRespuesta {

    code? : number;
    value? : string;

    public constructor(init?: Partial<PosibleRespuesta>) {
        Object.assign(this, init);
    }
}
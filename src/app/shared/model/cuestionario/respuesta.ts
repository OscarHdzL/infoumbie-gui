export class Respuesta {

    code?: number;
    value?: string;

    public constructor(init?: Partial<Respuesta>) {
        Object.assign(this, init);
    }
}
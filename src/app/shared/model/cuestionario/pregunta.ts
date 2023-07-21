import { PosibleRespuesta } from "./posibleRespuesta";
import { Respuesta } from "./respuesta";

export class Pregunta {

    id?: number;
    numeroPregunta?: number;
    controlType? : string;
    type? : string;
    placeHolder? : string;
    label? : string;
    required? : boolean;
    errorMessage? : string;
    canMaxima? : number;
    values? : Respuesta[];
    options?: PosibleRespuesta[];

    public constructor(init?: Partial<Pregunta>) {
        Object.assign(this, init);
    }
}
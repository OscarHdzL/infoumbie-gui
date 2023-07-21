import { Pregunta } from "./pregunta";

export class Cuestionario {

    idUnidad? : number;
    idArea? : number;
    idRubro? : number;
    idPerfil? : number;
    cveUsuario? : string;
    preguntas? : Pregunta[];

    public constructor(init?: Partial<Cuestionario>) {
        Object.assign(this, init);
    }
}

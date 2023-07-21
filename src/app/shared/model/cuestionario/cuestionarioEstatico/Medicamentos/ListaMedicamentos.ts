export class ListaMedicamentos {

    idListaMedicamento? : number;
    idMedicamentoCatalogo? : number;
    medicamento? : string;
    canPresenta? : string;
    concentracion? : string;
    forma? : string;

    public constructor(init?: Partial<ListaMedicamentos>) {
        Object.assign(this, init);
    }
}
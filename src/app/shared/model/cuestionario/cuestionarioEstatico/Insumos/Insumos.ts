import { CuatroBasico } from "./InsumosMedicamentoCuatroBasico";
import { AltoCosto } from "./InsumosMedicamentosAltoCosto";

export class Insumo {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idInsumo? : number = 0;
    cveUsuario? : string;


    medicamentosCuadroBasico? : number = null;
    faltaMedicamento? : number = null;
    abastoMedicamentoBasico? : number = null;
    solicitudEspecialBasico? : number = null;
    medicamentoAltoCosto? : number = null;
    faltaMedicamentoAltoCosto? : number = null;
    abastoMedicamentoAltoCosto? : number = null;
    solicitudAltoCosto? : number = null;
    cuentaMaterialCuracion? : number = null;
    faltaMaterialCuracion? : number = null;
    materialCuracion? : string;
    abastoMaterialCuracion? : number = null;
    solicitudMaterailCuracion? : number = null;
    servicioGeneral? : number = null;
    problemaLimpieza? : number = null;
    problemaInsumo? : number = null;
    problemaInsumoDes? : string;
    noAplicaAltoCosto? : number = null;
    noAplicaCuatroBasico? : number = null;

    listaCuadroBasico? : CuatroBasico[];
    listaAltoCosto? : AltoCosto[];

    public constructor(init?: Partial<Insumo>) {
        Object.assign(this, init);
    }
}
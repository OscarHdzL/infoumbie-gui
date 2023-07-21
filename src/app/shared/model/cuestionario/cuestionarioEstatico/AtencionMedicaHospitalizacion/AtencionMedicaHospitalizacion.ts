
import { AtencionMedicaCie10 } from "./AtencionMedicaCie10";


export class AtencionMedicaHospitalizacion {

    idClues? : number;
    idArea? : number;
    idRubro? : number;
    idAtencionMedicaHospitalizacion? : number = 0;
    cveUsuario? : string;
    saturacionServicio? : number = null;
    camaInsuficiente? : number = null;
    estanciaProlongada? : number = null;
    reingresoPaciente? : number = null;
    ingresoElevado? : number = null;
    noAplica? : number = null;
    porcentajeReingreso? : number = null;
    atencionMedicaHospitalizacionCie10? : AtencionMedicaCie10[];

    public constructor(init?: Partial<AtencionMedicaHospitalizacion>) {
        Object.assign(this, init);
    }
}
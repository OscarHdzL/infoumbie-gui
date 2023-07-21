export class AtencionMedicaCie10 {

    idCie10AtencionMedicaHospitalizacion? : number;
	idAtencionMedicaHospitalizacion? : number;
    idCie10? : number;
	refCie10? : string;
	atencionMedicaHospitalizacion: string;

    public constructor(init?: Partial<AtencionMedicaCie10>) {
        Object.assign(this, init);
    }

}
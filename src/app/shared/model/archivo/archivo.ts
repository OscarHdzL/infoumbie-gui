export class Archivo {
    file: File;
    fileName: string = '';
    fileSize: number;
    fileType: string = '';
    target: any;
    archivo: any;
    area?: string;
    rubro?: string; 
    refUid? : string;
    download: boolean = false;

    public constructor(init?: Partial<Archivo>) {
        Object.assign(this, init);
    }
}


export class ArchivoResponse {
    public mediaType: string;
    public nombreArchivo: string;
    public archivoBase64: string;
}

export class ArchivoFile {
    public file: File;
    public base64: Blob  | MediaSource;
    public nomFile: string;
    public srcImagen:  any;
}

  

export class ArchivoResponse {
    public mediaType: string;
    public nombreArchivo: string;
    public archivoBase64: string;
}

export class Archivo {
    public file: File;
    public base64: Blob  | MediaSource;
    public nomFile: string;
    public srcImagen:  any;
}

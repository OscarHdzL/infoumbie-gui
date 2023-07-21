export interface ModalDialogType {

    type : string;
    title? : string;
    text? : string;
    imgSrc? : string;
    confirm? : Function;
    reject? : Function;
    dismiss? : Function;
    alerta? : boolean;
 
 }
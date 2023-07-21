import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private duration: number = 3; //Segundos

  constructor(private _snackBar: MatSnackBar) { }

  public showAlertError(message: string) {
    this.showAlert(message,'panelAlertError' );
  }

  public showAlertSuccess(message: string) {
    this.showAlert(message,'panelAlertSuccess' );
  } 

  public showAlertWarning(message: string) {
    this.showAlert(message,'panelAlertWarning' );
  } 

  private showAlert(message: string, panelClass: string) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: panelClass
    });
  }

}

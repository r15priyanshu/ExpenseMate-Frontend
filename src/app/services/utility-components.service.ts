import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CustomSnackbarData } from '../components/utilities/custom-snackbar/CustomSnackbarData';
import { CustomSnackbarComponent } from '../components/utilities/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityComponentsService {

  constructor(private matSnackBar: MatSnackBar) { }

  public openCustomSnackBar(customSnackbarData:CustomSnackbarData): MatSnackBarRef<CustomSnackbarComponent> {
    return this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      data: customSnackbarData
    });
  }
}

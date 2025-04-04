import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CustomSnackbarData } from '../helpers/custom-snackbar-data';
import { CustomSnackbarComponent } from '../components/utilities/custom-snackbar/custom-snackbar.component';
import { CustomConfirmDialogData } from '../helpers/custom-confirm-dialog-data';
import { CustomConfirmDialogComponent } from '../components/utilities/custom-confirm-dialog/custom-confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UtilityComponentsService {

  constructor(
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  public openCustomSnackBar(customSnackbarData:CustomSnackbarData): MatSnackBarRef<CustomSnackbarComponent> {
    return this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      data: customSnackbarData
    });
  }

  public openConfirmDialog(dialogData: CustomConfirmDialogData): MatDialogRef<CustomConfirmDialogComponent> {
    return this.matDialog.open(CustomConfirmDialogComponent, {
      data: dialogData,
    });
  }
}

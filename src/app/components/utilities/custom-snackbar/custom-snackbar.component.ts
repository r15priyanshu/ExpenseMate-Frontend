import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CustomSnackbarData, SNACK_BAR_DEFAULTS } from './CustomSnackbarData';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-snackbar',
  imports: [CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent {
  private actionSubject = new Subject<void>();

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackbarData,
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>
  ) {}

  getButtonClass() {
    return {
      'btn-success': this.data.snackbarType === SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
      'btn-danger': this.data.snackbarType === SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
      'btn-warning': this.data.snackbarType === SNACK_BAR_DEFAULTS.SB_TYPE_WARNING,
    };
  }

  dismissSnackBar() {
    this.snackBarRef.dismiss();
  }

  triggerEvent() {
    //Just emmit an event , so that we can perform some action after it at the callers end and Also dismiss the currently opened snackbar.
    this.actionSubject.next();
    this.snackBarRef.dismiss();
  }

  performCustomAction() {
    return this.actionSubject.asObservable();
  }
}

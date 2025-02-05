import { Component, Inject } from '@angular/core';
import { CustomConfirmDialogData } from '../../../helpers/custom-confirm-dialog-data';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-confirm-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrl: './custom-confirm-dialog.component.scss',
})
export class CustomConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomConfirmDialogData) {}
}

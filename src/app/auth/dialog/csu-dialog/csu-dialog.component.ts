import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-csu-dialog',
  templateUrl: './csu-dialog.component.html',
  styleUrls: ['./csu-dialog.component.css']
})
export class CsuDialogComponent {
  constructor( public dialogRef: MatDialogRef<CsuDialogComponent> ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

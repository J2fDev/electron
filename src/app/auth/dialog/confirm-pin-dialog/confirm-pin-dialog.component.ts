import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-pin-dialog',
  templateUrl: './confirm-pin-dialog.component.html',
  styleUrls: ['./confirm-pin-dialog.component.css']
})
export class ConfirmPinDialogComponent implements OnInit {
  hide: boolean = false;
  constructor( public dialogRef: MatDialogRef<ConfirmPinDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

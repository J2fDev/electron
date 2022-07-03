import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-pin-dialog',
  templateUrl: './register-pin-dialog.component.html',
  styleUrls: ['./register-pin-dialog.component.css']
})
export class RegisterPinDialogComponent implements OnInit {
  hide!: boolean;
  
  constructor( public dialogRef: MatDialogRef<RegisterPinDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

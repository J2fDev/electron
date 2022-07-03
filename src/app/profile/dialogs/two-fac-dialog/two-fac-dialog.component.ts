import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-two-fac-dialog',
  templateUrl: './two-fac-dialog.component.html',
  styleUrls: ['./two-fac-dialog.component.css']
})
export class TwoFacDialogComponent implements OnInit {
  method: string = 'Email';
  methodString: string = "Gabri****ki@gmail.com"
  hide: boolean = false;
  constructor( public dialogRef: MatDialogRef<TwoFacDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


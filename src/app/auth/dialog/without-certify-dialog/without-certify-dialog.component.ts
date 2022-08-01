import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-without-certify-dialog',
  templateUrl: './without-certify-dialog.component.html',
  styleUrls: ['./without-certify-dialog.component.css']
})
export class WithoutCertifyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WithoutCertifyDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(accept: boolean): void {
    this.dialogRef.close(accept);
  }
}

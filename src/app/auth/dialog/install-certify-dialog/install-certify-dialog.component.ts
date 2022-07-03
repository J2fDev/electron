import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmInstallDialogComponent } from '../confirm-install-dialog/confirm-install-dialog.component';
@Component({
  selector: 'app-install-certify-dialog',
  templateUrl: './install-certify-dialog.component.html',
  styleUrls: ['./install-certify-dialog.component.css']
})
export class InstallCertifyDialogComponent implements OnInit {
hide: boolean = false;
  constructor(public dialogRef: MatDialogRef<InstallCertifyDialogComponent>, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.confirmCertify();
  }

  confirmCertify(){
    const dialogRef = this.dialog.open(ConfirmInstallDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  });
  }
}

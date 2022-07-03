import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterPinDialogComponent } from '../register-pin-dialog/register-pin-dialog.component';

@Component({
  selector: 'app-confirm-install-dialog',
  templateUrl: './confirm-install-dialog.component.html',
  styleUrls: ['./confirm-install-dialog.component.css']
})
export class ConfirmInstallDialogComponent implements OnInit {
  reciveListA1: any[] = [{name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'CertifyDig', validade:'20/12/2021', ativo: true},
  ];
  constructor(public dialogRef: MatDialogRef<ConfirmInstallDialogComponent>, private route: Router, public dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
    this.openDialog();
  }
 
  openDialog(){
    const dialogRef = this.dialog.open(RegisterPinDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  });
}

}

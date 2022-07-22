import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmPinDialogComponent} from '../../dialog/confirm-pin-dialog/confirm-pin-dialog.component';
import {LoginService} from "../../../core/services/login.service";
import {WithoutCertifyDialogComponent} from "../../dialog/without-certify-dialog/without-certify-dialog.component";

@Component({
  selector: 'auth-certify',
  templateUrl: './certify.component.html',
  styleUrls: ['./certify.component.css']
})

export class CertifyComponent implements OnInit {

  certiList: any[] = [{type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'CertifyDig', validade:'20/12/2021', ativo: true},
  {type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2,name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 1,name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  ];//*/

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  withoutCertify() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  usingLogin() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showHelp() {
    console.log("help");
  }

  openPinDialog(type: number) {
    if ( type === 1) {
      const dialogRef = this.dialog.open(ConfirmPinDialogComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmPinDialogComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  }

  addCertifyA1() {
    this.router.navigate(["auth/cadcerti"]);
  }

  logout() {
    //this.certifyService.token = "";
    this.loginService.disconnectSocket();
    this.router.navigate(["auth"]);
  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmPinDialogComponent} from '../../dialog/confirm-pin-dialog/confirm-pin-dialog.component';
import {RegisterPinDialogComponent} from '../../dialog/register-pin-dialog/register-pin-dialog.component';
import {LoginService} from "../../../core/services/login.service";
import {WithoutCertifyDialogComponent} from "../../dialog/without-certify-dialog/without-certify-dialog.component";

@Component({
  selector: 'auth-certify',
  templateUrl: './certify.component.html',
  styleUrls: ['./certify.component.css']
})

export class CertifyComponent implements OnInit {

  reciveListA1: any[] = [];
  /*[{name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'CertifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  ];//*/

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  a1Forms: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    fileA1: [],
  });


  selectCertify() {
    console.log(this.a1Forms.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openPinDialog() {
    const dialogRef = this.dialog.open(ConfirmPinDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

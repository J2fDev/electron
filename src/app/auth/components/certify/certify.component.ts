import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {WithoutCertifyDialogComponent} from '../../dialog/without-certify-dialog/without-certify-dialog.component';
import {ConfirmPinDialogComponent} from '../../dialog/confirm-pin-dialog/confirm-pin-dialog.component';
import {RegisterPinDialogComponent} from '../../dialog/register-pin-dialog/register-pin-dialog.component';
import {InstallCertifyDialogComponent} from '../../dialog/install-certify-dialog/install-certify-dialog.component';
import {CertifyService} from "../../../core/services/certify.service";
import {ElectronService} from "../../../core/services";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'auth-certify',
  templateUrl: './certify.component.html',
  styleUrls: ['./certify.component.css']
})

export class CertifyComponent implements OnInit {

  ableButtonA1: boolean = true;
  hideForm: boolean = false;
  hideList: boolean = true;
  reciveListA1: any[] = [];
  /*[{name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'CertifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  ];//*/

  listA1: any[] = [];
  detectedA3: boolean = false;
  addCertify: boolean = false;
  formA1If: boolean = false;
  listA1If: boolean = true;
  liberaLista: boolean = false;
  isWeb: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private certifyService: CertifyService, private electronService: ElectronService) {
  }

  ngOnInit(): void {

  }

  a1Forms: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    fileA1: [],
  })


  validateFormsA1() {
    if (this.a1Forms.valid) {
      this.ableButtonA1 = false;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addCertifyA1() {
    this.addCertify == false ? this.addCertify = true : this.addCertify = false;
  }

  selectCertify() {
    console.log(this.a1Forms.value);

  }

  openPinDialog() {
    const dialogRef = this.dialog.open(ConfirmPinDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  implementsA1List() {
    this.listA1.push(this.a1Forms.value);
    console.log('sadfasdfsadfsdf', this.listA1);
    this.addCertify = false;
  }

  callAddCertify() {
    this.addCertify == false ? this.addCertify = true : this.addCertify = false;
  }

  registerPinDIalog() {
    const dialogRef = this.dialog.open(RegisterPinDialogComponent, {
      width: '500px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.certifyService.token = "";
    this.certifyService.disconnectSocket();
    this.router.navigate(["auth"]);
  }

  installCertifyPassword() {
    const dialogRef = this.dialog.open(InstallCertifyDialogComponent, {
      width: '500px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  pushLista1() {
    this.listA1.push(1)
    this.addCertify = false;
  }
}

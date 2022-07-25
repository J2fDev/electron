import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {WithoutCertifyDialogComponent} from '../../dialog/without-certify-dialog/without-certify-dialog.component';
import {ConfirmPinDialogComponent} from '../../dialog/confirm-pin-dialog/confirm-pin-dialog.component';
import {RegisterPinDialogComponent} from '../../dialog/register-pin-dialog/register-pin-dialog.component';
import {InstallCertifyDialogComponent} from '../../dialog/install-certify-dialog/install-certify-dialog.component';
import {LoginService} from "../../../core/services/login.service";

@Component({
  selector: 'auth-cadcerti',
  templateUrl: './cadcerti.component.html',
  styleUrls: ['./cadcerti.component.css']
})

export class CadcertiComponent implements OnInit {

  addStage: number = 4;
  title: string = "Instalacão do Certificado";
  dragAreaClass: string;
  errorMessage: string = "";
  filename : string = "J2F_Sistemas_Inteligentes.pfx";
  hide: boolean = true;
  certi : any = {
    name: "J2F Sistemas Inteligentes LTDA: 44688671000162",
    emissor: "AC Certisign RFB G4",
    validade: "22/11/2021 ~ 22/11/2023"
  };

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.dragAreaClass = "dragarea";
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    console.log(event.dataTransfer);
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {

    if (files.length > 1) this.errorMessage = "Só é possível enviar um certificado por vez.";
    else {
      this.errorMessage = "";
      console.log(files[0].size,files[0].name,files[0].type);
      this.addStage = 2;
    }
  }

  a1Forms: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    fileA1: [],
  });

  openDialog() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  registerPinDIalog() {
    const dialogRef = this.dialog.open(RegisterPinDialogComponent, {
      width: '500px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  return() {
    if ( this.addStage <= 1 ) {
      this.router.navigate(["auth/certify"]);
    } else {
      this.addStage -= 1;
    }
  }

  next() {
    if ( this.addStage === 3 ) {
      this.addStage = 4;
      this.title = "Cadastrar Senha CSU";
    } else {
      this.addStage += 1;
    }
  }

  installCertifyPassword(e) {

    const dialogRef = this.dialog.open(InstallCertifyDialogComponent, {
      width: '500px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

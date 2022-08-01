import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginService} from "../../../core/services/login.service";
import {CsuDialogComponent} from "../../dialog/csu-dialog/csu-dialog.component";

@Component({
  selector: 'auth-cadcerti',
  templateUrl: './cadcerti.component.html',
  styleUrls: ['./cadcerti.component.css']
})

export class CadcertiComponent implements OnInit {

  addStage: number = 1;
  title: string = "Adicione um Certificado A1";
  dragAreaClass: string;
  errorMessage: string = "";
  filename : string = "J2F_Sistemas_Inteligentes.pfx";
  hide: boolean = true;
  certi : any = {
    name: "J2F Sistemas Inteligentes LTDA: 44688671000162",
    emissor: "AC Certisign RFB G4",
    validade: "22/11/2021 ~ 22/11/2023"
  };
  step1 : boolean = false;
  step2 : boolean = false;

  @ViewChild('stepper') stepper;

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private loginService: LoginService, public dialogRef: MatDialogRef<CadcertiComponent>) {
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

  async saveFiles(files: FileList) {

    if (files.length > 1) this.errorMessage = "Só é possível enviar um certificado por vez.";
    else {
      this.errorMessage = "";
      if ( files[0].size/1024 > 500 ) {
        this.errorMessage = "O arquivo é grande demais";
        return;
      }
      if ( files[0].type !== "image/png" ) {
        this.errorMessage = "Tipo de arquivo não suportado.";
        return;
      }
      this.filename = files[0].name;
      console.log(files[0].size,files[0].name,files[0].type);

      this.step1 = true;
      setTimeout(() => {
        this.addStage = 2;
        this.alterTitle();
        this.stepper.next();
      }, 500) // resolves after 100,000ms

    }
  }

  a1Forms: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    fileA1: [],
  });

  selectCertify() {
    console.log(this.a1Forms.value);

  }

  return() {
    //this.router.navigate(["auth/certify"]);
    this.dialogRef.close();
  }

  lastSteep() {
    this.addStage = 4;
    this.stepper.next();
  }

  alterTitle() {
    this.errorMessage = "";
    switch ( this.addStage ) {
      case 1:
        this.title = "Adicione um Certificado A1";
        break;
      case 2:
        this.title = "Instalação do Certificado";
        break;
      case 3:
        this.title = "Instalação do Certificado";
        break;
      case 4:
        this.title = "Cadastrar Senha CSU";
        break;
      case 5:
        this.title = "Informar Senha CSU";
        break;
    }
  }

  openCerti(pass) {
    if ( pass === "123456" ) {
      this.errorMessage = "A senha informada é inválida";
    } else {
      this.step2 = true;
      this.addStage = 3;
      this.alterTitle();
    }
  }

  csuhelp() {
    const dialogRef = this.dialog.open(CsuDialogComponent, {
      width: '500px',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  finish() {

  }
}

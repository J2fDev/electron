import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmPinDialogComponent} from '../../dialog/confirm-pin-dialog/confirm-pin-dialog.component';
import {LoginService} from "../../../core/services/login.service";
import {WithoutCertifyDialogComponent} from "../../dialog/without-certify-dialog/without-certify-dialog.component";
import {CadcertiComponent} from "../cadcerti/cadcerti.component";

@Component({
  selector: 'auth-certify',
  templateUrl: './certify.component.html',
  styleUrls: ['./certify.component.css']
})

export class CertifyComponent implements OnInit {

  certiList: any[] = [];
    /*[{type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'CertifyDig', validade:'20/12/2021', ativo: true},
  {type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor:'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 1, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2, name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 2,name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  {type: 1,name:'J2F Sistemas Inteligentes LTDA 44.97.907', emissor: 'certifyDig', validade:'20/12/2021', ativo: true},
  ];//*/

  a1List: any[] = [];
  selected: boolean = false;
  selectedItem: any = null;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog,
              private loginService: LoginService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loginService.request("get", "certi/list").then((resp: any) => {
      if ( resp.length > 0 ) {
        this.a1List = resp;
        for ( let item of resp ) {
          this.certiList.push({
            type: 1,
            name: item.name,
            emissor: item.emissor || '',
            validade: item.validade || '',
            ativo: item.ativo || false
          })
        }
      }
    });

    if ( this.loginService.isElectron ) {
      this.loginService.ipcRenderer.invoke("listcertis" ).then((certis : any) => {
        if ( certis.length > 0 ) {
          for ( let item of certis ) {
            this.certiList.push({
              type: 2,
              name: item.nome + ":" + item.doc,
              emissor: item.emissor,
              validade: '',
              ativo: true
            });
          }
        }
      });

      this.loginService.ipcRenderer.on("usbcertischange", ( event, list) => {
        this.certiList = [];
        for ( let item of this.a1List ) {
          this.certiList.push({
            type: 1,
            name: item.name,
            emissor: item.emissor || '',
            validade: item.validade || '',
            ativo: item.ativo || false
          })
        }
        for ( let item of list ) {
          this.certiList .push({
            type: 2,
            name: item.nome + ":" + item.doc,
            emissor: item.emissor,
            validade: '',
            ativo: true
          });
        }
        this.cd.detectChanges();
      });
    }
  }

  withoutCertify() {
    const dialogRef = this.dialog.open(WithoutCertifyDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.router.navigate(["main"]);
      }
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

  selectItem(item) {
    this.selected = true;
    this.selectedItem = item;
  }

  deselect() {
    this.selected = false;
    this.selectedItem = null;
  }

  addCertifyA1() {
    //this.router.navigate(["auth/cadcerti"]);
    const dialogRef = this.dialog.open(CadcertiComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Chama novamente a funcao que retorna a lista de certificados
    });
  }

  confirmPin(pin: string) {

  }

  logout() {
    //this.certifyService.token = "";
    this.loginService.disconnectSocket();
    this.router.navigate(["auth"]);
  }
}

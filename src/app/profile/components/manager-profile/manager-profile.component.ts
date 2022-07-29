import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwoFacDialogComponent } from '../../dialogs/two-fac-dialog/two-fac-dialog.component';
import { IbgeService } from "../../../core/services/ibge.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Profile } from './profileClass';
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  hide = true;
  profileForm!: FormGroup;
  selectedUf: string = 'AM';
  userCpf: number = 14736234644;
  token: string = '';
  userEmail = '';
  newAdress: any = [];
  urlProfile = '/profile/profile';

  constructor(public dialog: MatDialog, private apiService: ApiService, public ibgeService: IbgeService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.createForm(new Profile());
    this.profileForm.controls['doc'].disable();
  }


  createForm(profile: Profile) {
    this.profileForm = this.formBuilder.group({
      fullName: [profile.fullName, [Validators.minLength(3),]],
      oab: [profile.oab],
      oabuf: [profile.oabuf],
      doc: [this.userCpf],
      whatsapp: [profile.whatsapp],
      email: [profile.email,[ Validators.minLength(3)]],
      addresses: [this.newAdress]
    })
  }

   async saveInfo() {
    console.log(this.profileForm.value);
    console.log(this.token);
    console.log(this.newAdress);
    const request = await this.apiService.request('put',  this.urlProfile, this.profileForm.value);
    console.log(request);

  }

  showToken() {
    const token = this.apiService.token;
    console.log(token);

  }

  open2fDialog() {
    const dialogRef = this.dialog.open(TwoFacDialogComponent, {
      width: '31rem',
      height: '24.5rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

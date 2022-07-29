import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Profile } from '../manager-profile/profileClass';
import { IbgeService } from "../../../core/services/ibge.service";
import {LoginService} from "../../../core/services/login.service";

@Component({
  selector: 'app-info-data',
  templateUrl: './info-data.component.html',
  styleUrls: ['./info-data.component.css']
})
export class InfoDataComponent implements OnInit {

  hide = true;
  profileForm!: FormGroup;
  selectedUf: string = 'AM';
  userCpf: number = 14736234644;
  token: string = '';
  userEmail = '';
  newAdress: any = [];
  urlProfile = '/profile/profile';

  constructor(public loginService: LoginService, private formBuilder: FormBuilder, public ibgeService: IbgeService) { }

  ngOnInit(): void {
    this.createForm(new Profile());
    this.profileForm.controls['doc'].disable();
  }


  createForm(profile: Profile) {
    this.profileForm = this.formBuilder.group({
      fullName: [profile.fullName, [Validators.required, Validators.minLength(3),]],
      oab: [profile.oab, [Validators.required, Validators.minLength(3),]],
      oabuf: [profile.oabuf,  [Validators.required, Validators.minLength(2),]],
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
    const request = await this.loginService.request('put',  this.urlProfile, this.profileForm.value);
    console.log(request);
  }
}

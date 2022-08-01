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
  newAdress: any = [];
  urlProfile = '/profile/profile';
  secondFactoreWhatsapp = false;
  secondFactoreEmail = false;
  showAvatarEdit : boolean = false;

  constructor(public loginService: LoginService, private formBuilder: FormBuilder, public ibgeService: IbgeService) { }

  ngOnInit(): void {
    this.createForm(new Profile());

    this.loginService.request("get", "profile/profile").then((resp : any) => {
      console.log(resp);
      this.profileForm.controls["fullName"].setValue(resp.fullName || "");
      this.profileForm.controls["oab"].setValue(resp.oab);
      this.profileForm.controls["oabuf"].setValue(resp.oabuf);
      this.profileForm.controls["doc"].setValue(resp.doc);
      this.profileForm.controls["whatsapp"].setValue(resp.whatsapp);
      this.profileForm.controls["email"].setValue(resp.email);
      this.profileForm.controls["addresses"].setValue(resp.address || []);


    });


    this.profileForm.controls['doc'].disable();
  }


  createForm(profile: Profile) {
    this.profileForm = this.formBuilder.group({
      fullName: [profile.fullName, [Validators.required, Validators.minLength(3),]],
      oab: [profile.oab, [Validators.required, Validators.minLength(3), Validators.max(9999999)]],
      oabuf: [profile.oabuf,  [Validators.required, Validators.minLength(2),]],
      doc: [profile.doc],
      whatsapp: [profile.whatsapp],
      email: [profile.email,[ Validators.minLength(3)]],
      addresses: [[]]
    })
  }

  showEditAvatar() {
    this.showAvatarEdit = true;
  }

  hideEditAvatar() {
    this.showAvatarEdit = false;
  }


   async saveInfo() {
    console.log(this.profileForm.value);
    console.log(this.newAdress);
    const request = await this.loginService.request('put',  this.urlProfile, this.profileForm.value);
    console.log(request);
  }
}

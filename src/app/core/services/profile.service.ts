import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {

// profileInfo = {
//   fullnName: '',
//   oab: '',
//   oabUf: '',
//   avatar: '',
//   doc: 0,
//   whatsapp: 0,
//   whatsVerifyed: false,
//   email: '',
//   verifyed: false,
//   adresses: [

//     {
//       id: '',
//       tipo: '',
//       logradouro: '',
//       bairro: '',
//       cep: '',
//       numero: '',
//       complemento: '',
//       cidade: '',
//       estado: ''
//     }
//   ],
// password: '',
// }

  urlProfile = 'profile/profile'

constructor(private http: HttpClient) {
  super(http);
}

 async sendToServer( info: any[]){
  let data: any = await this.request("put", this.urlProfile, info )
  return data
}

// console.log(courts);
// let data: any  = await this.request("put", this.urlPostCourts, {'courts' : courts})  
// return data

userAttributes(){
  let userPlan = this.checkUserPlan();
  switch (userPlan){
    case 'free': 
    return {
      manyCourts: 1,
      courtsPreSelect:[
        "62a8970a4b2c8a528010f49c"
      ]
    }
    case 'unicoPlan': 
      return {
        manyCourts: 5,
        courtsPreSelect: [
          "62a8970a4b2c8a528010f49b",
          "62a8970a4b2c8a528010f49c",
          "62a8970a4b2c8a528010f487",
        ]
    }
    default: 
    return {
      error: 'não foi encontrado nenhum plano para esse usuário'
    }
    
  }
}


checkUserPlan(){
  return 'unicoPlan'
}
}

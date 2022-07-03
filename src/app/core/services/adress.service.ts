import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdressService extends ApiService {

  private urlNewAdress = '/auth/login';
  private urlEditAdress = '/auth/verify';
  private urlDeleteAdress = '/auth/fistlogin';


  constructor(private http: HttpClient) { 
    super(http);
   }

   newAdress(adress: any) {
      return this.request("post", this.urlNewAdress, adress, false);
   }

   newClientAdress(adress: any) {
      return this.request("post", this.urlEditAdress, adress, false);
   }

   editAdress(adress: any) {
      return this.request("post", this.urlEditAdress, adress, false);
   }

   editClientAdress(adress: any) {
     return this.request("post", this.urlEditAdress, adress, false);
   }

    deleteAdress(adress: any) {
      return this.request("post", this.urlDeleteAdress, adress, false);
   }

   deleteClientAdress(adress: any) {
      return this.request("post", this.urlDeleteAdress, adress, false);
   }


   
}

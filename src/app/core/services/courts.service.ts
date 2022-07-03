import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CourtsService extends ApiService {

  urlPostCourts= '/profile/courts'
  urlGetCourts= '/court/list'

  courts: any  = [];


  constructor(private http: HttpClient) {
    super(http);
  }

  getCourtsByUserId(arg0: string) {
    throw new Error('Method not implemented.');
  }


  maxCourtsByPlan() {
    return 3;
  }

   async getCourts(){
    this.courts = await this.request("get", this.urlGetCourts);
    return this.courts
  }

  async sendCourts(courts: any){
      console.log(courts);
      let data: any  = await this.request("put", this.urlPostCourts, {'courts' : courts})  
      return data
  }

}

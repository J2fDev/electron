import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChargebeeService {

  private checkUserUrl: string = 'http://192.168.1.85:3000/chargebee/checkSubscription';
  private UserId: string = "";
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  }

  checkUser(user: any) {
    let retorno = this.http.post(this.checkUserUrl, user, this.httpOptions);
    return {
      "userIsSubscribed": true,
      "userPLan": "Basic",
    }
  }

  retrieveUserId(user: string) {
    console.log("SALVANDO USUARIO " + user);
    this.UserId = user;
  }

  logUserId(){
    console.log(this.UserId);
    return  this.UserId;
  }

  createActionPage(){

  }
}

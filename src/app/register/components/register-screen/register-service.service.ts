import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private urlSignUp = 'http://localhost:3000/auth/signup';
  private urlChargebee = 'http://192.168.1.85:3000/chargebee/signup'


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  }

  RegisterUser(user: any) {
    return this.http.post(this.urlSignUp, user, this.httpOptions);
  }

  RegisterChargebee(user: any) {
    return this.http.post(this.urlChargebee, user, this.httpOptions);
  }
}

export interface User {
  username: string,
  doc: string,
  email: string,
  password: string,
}




import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {
  private urlLogin = '/auth/login';
  private urlVerify = '/auth/verifymail';
  private urlFirstLogin = '/auth/fistlogin';
  private chargebeeUrl = '/chargebee/checkSubscription';

  private userAuth: boolean = false;
  private user: any;

  set keepLogged(keep: boolean) {
    window.localStorage.setItem("kl", (keep) ? "S" : "N");
  }

  get keepLogged() {
    let resp = window.localStorage.getItem("kl");
    if ( resp === undefined || resp === null ) return false;
    else {
      if ( resp === "S" ) return true;
      else return false;
    }
  }

  constructor(private http: HttpClient) {
    super(http);

    if ( this.isElectron ) {
      this.ipcRenderer.on("usbcertischange", (event, args) => {
        console.log(event);
        console.log(args);
      });
    }
  }

  async login(user: any) {
    this.keepLogged = user.keepLogged;

    let data : any = await this.request("post", this.urlLogin, user, false);
    if ( data.token !== null && data.token !== undefined ) {
      this.token = data.token;
    }

    return data;

  }

  async validateToken() {
    let data : any = await this.request("post", "/auth/verifytoken", {token: this.token}, false);

    return data;
  }

  checkAuth(token: string) {
    if (token) {
      this.userAuth = true;
      return this.userAuth;
    }
    this.userAuth = false;
    return this.userAuth;
  }

  authorizationToken() {
    return this.userAuth;
  }

  verifyEmail() {
    return this.request('get', this.urlVerify);
  }

  checkSubscription(user: any) {
    return this.request('post', this.chargebeeUrl, user);
  }

}

export interface User {
  login: string,
  password: string,
  keepLogged: boolean,
}


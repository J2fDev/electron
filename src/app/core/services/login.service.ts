import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {
  private urlLogin = '/auth/login';
  private urlVerify = '/auth/verify';
  private urlFirstLogin = '/auth/fistlogin';
  private chargebeeUrl = '/chargebee/checkSubscription';

  private userAuth: boolean = false;
  private user: any;

  constructor(private http: HttpClient) {
    super(http);
  }

  async login(user: any) {
    let data : any = await this.request("post", this.urlLogin, user, false);

    if ( data.token !== null && data.token !== undefined ) {
      this.token = data.token;
    }

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
    return this.userAuth
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


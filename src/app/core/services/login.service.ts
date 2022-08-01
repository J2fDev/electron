import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {
  private urlVerify = '/auth/verifymail';
  private urlFirstLogin = '/auth/fistlogin';
  private chargebeeUrl = '/chargebee/checkSubscription';

  private userAuth: boolean = false;
  private user: any;

  //Variaveis relacionadas aos certificados
  private certis: any[] = [];
  private selectedCerti : any = null;
  private recivedCertEvent: boolean = false;

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

  set doc(doc: string) {
    window.localStorage.setItem("doc", doc);
  }

  get doc() {
    let resp = window.localStorage.getItem("doc");
    if ( resp === undefined || resp === null ) return "";
    else return resp;
  }

  set nome(nome: string) {
    window.localStorage.setItem("nome", nome);
  }

  get nome() {
    let resp = window.localStorage.getItem("nome");
    if ( resp === undefined || resp === null ) return "Nome não informaod";
    else return resp;
  }

  set avatar(avatar: string) {
    window.localStorage.setItem("avatar", avatar);
  }

  get avatar() {
    let resp = window.localStorage.getItem("avatar");
    if ( resp === undefined || resp === null ) return "";
    else return resp;
  }

  set oab(oab: string) {
    window.localStorage.setItem("oab", oab);
  }

  get oab() {
    let resp = window.localStorage.getItem("oab");
    if ( resp === undefined || resp === null ) return "OAB MG - 12345";
    else return resp;
  }

  get hasCerti() {
    if ( this.selectedCerti === null ) return false;
    return true;
  }

  constructor(private http: HttpClient) {
    super(http);

    if ( this.isElectron ) {
      this.ipcRenderer.on("usbcertischange", (event, args) => {
        console.log(event);
        console.log(args);
        this.recivedCertEvent = true;
        this.certis = args;
      });
    }
  }

  async getCertificates() {
    if ( !this.recivedCertEvent ) {
      this.ipcRenderer.invoke("listcertis").then((resp) => {
        console.log(resp);
        this.certis = resp;
      });
    }
  }

  async login(user: any) {
    this.keepLogged = user.keepLogged;

    let data : any = await this.request("post", '/auth/login', user, false);
    if ( data.token !== null && data.token !== undefined ) {
      this.token = data.token;
      this.nome = data.fullName;
      this.doc = data.doc;

      if ( data.profile.oab !== null && data.profile.oab !== undefined && data.profile.oab !== "" ) {
        this.oab = "OAB " + data.profile.oabuf.toUpperCase() + "-" + data.profile.oab;
      } else {
        this.oab = "OAB";
      }

    }

    return data;
  }

  async logout() {
    this.token = "";
    this.nome = "";
    this.oab = "";
    this.doc = "";

    // Avisar quem tiver que avisar para deslogar
    this.disconnectSocket();
  }

  async forgot(user: any) {
    let data : any = await this.request("post", "/auth/forgot", user, false);
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


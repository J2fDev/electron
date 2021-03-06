import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import {Subject} from "rxjs";
import {ElectronService} from "./electron/electron.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends ElectronService {
  //private urlBase : string = "http://192.168.1.85:3000";
  private urlBase : string = "http://localhost:3000";

  constructor(private req: HttpClient) {
    super();
  }

  private static socket : any = null;
  public messageEvent: Subject<string> = new Subject<string>();
  public sectionTitle: String = 'Home';

  set token(token: string) {
    window.localStorage.setItem("token", token);
  }

  get token() {
    let token = window.localStorage.getItem("token");
    if ( token === undefined || token === null ) return "";
    else return token;
  }

  connectSocket() {
    if ( ApiService.socket !== null ) {
      console.log("O socket esta connectado ver o que fazer");
    } else {
      this.request("get", "/ws/socket", null, false).then((resp: any) => {
        //console.log(resp);
        try {
          ApiService.socket = io(resp.ip + ":" + resp.port, {
            reconnectionDelayMax: 10000,
            auth: {
              token: this.token
            }
          });

          ApiService.socket.on("wellcome", (args: any) => {
            console.log(args);
          });

          ApiService.socket.on("message", (args: any) => {
            console.log(args);
            this.messageEvent.next(args);
          });


        } catch ( e ) {
          console.log(e);
        }
      })
    }

  }

  disconnectSocket() {
    if ( ApiService.socket !== null && ApiService.socket !== undefined && ApiService.socket.connected ) {
      ApiService.socket.disconnect();
    }

  }

  // setSectionTitle


  external(type: string, url:any, data:any = null, secure: boolean = true, headers: Array<{property: string, value: string}> = []) {
    return new Promise((resolve, reject) => {

      let httpOptions = {
        headers: new HttpHeaders({
        })
      };

      if ( headers.length > 0) {
        for ( let header of headers ) {
          httpOptions.headers.append(header.property, header.value);
        }
      }

      let request = null;

      switch ( type.toLocaleLowerCase() ) {
        case "post":
          request = this.req.post(url , data , httpOptions);
          break;
        case "get":
          request = this.req.get(url, httpOptions);
          break;
        case "put":
          request = this.req.put(url, data, httpOptions);
          break;
        case "delete":
          request = this.req.delete(url, httpOptions);
          break;
        default:
          reject("Tipo de requisi????o n??o reconhecida");
          return;
      }

      request.subscribe(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  request(type: string, url:any, data:any = null, secure: boolean = true, headers: Array<{property: string, value: string}> = []) {
    return new Promise((resolve, reject) => {
      let httpOptions = null;

      if ( secure ) {
        httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Authorization': "Bearer " + this.token
          })
        };
      } else {
        httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          })
        };
        httpOptions.headers = httpOptions.headers.append("Authorization", "Bearer " + this.token);
      }

      if ( headers.length > 0) {
        for ( let header of headers ) {
          httpOptions.headers.append(header.property, header.value);
        }
      }

      let request = null;

      if ( url[0] !== '/' ) url = "/" + url;

      switch ( type.toLocaleLowerCase() ) {
        case "post":
          request = this.req.post(this.urlBase + url , data , httpOptions);
          break;
        case "get":
          request = this.req.get(this.urlBase + url, httpOptions);
          break;
        case "put":
          request = this.req.put(this.urlBase + url, data, httpOptions);
          break;
        case "delete":
          request = this.req.delete(this.urlBase + url, httpOptions);
          break;
        default:
          reject("Tipo de requisi????o n??o reconhecida");
          return;
      }

      request.subscribe(
        res => {
          // TODO: Criar funcao para salvar o resultado em disco
          resolve(res)
        },
        err => {
          console.log("Resposta do request subscribe com erro");
          console.log(err);

          if ( err.status === 500 ) {
            // Aqui deu erro interno no servidor enviar para a pagina de problema
          } else if ( err.status === 401 ) {
            // Aqui deu que nao era authorizado, criar uma pagina para isso ou enviar para o login?
          } else if ( err.status === 0 ) {
            // Nao foi possivel conectar com o servidor
          } else {

          }
          // TODO: Emitir evento de unauthorized ( verificar token e deslogar se necessario )
          reject(err)
        }
      );

    });
  }

}

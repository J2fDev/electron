import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private urlBase : string = "http://192.168.1.85:3000";
  private urlBase : string = "http://localhost:3000";
  constructor(private req: HttpClient) { }

  private static socket : any = null;
  public messageEvent: Subject<string> = new Subject<string>();
  public sectionTitle: String = 'Home'

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
          reject("Tipo de requisićão não reconhecida");
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
          reject("Tipo de requisićão não reconhecida");
          return;
      }

      request.subscribe(
        res => {
          console.log("Resposta do request subscribe");
          console.log(res);
          resolve(res)
        },
        err => {
          console.log("Resposta do request subscribe com erro");
          console.log(err);
          reject(err)
        }
      );

    });
  }

}

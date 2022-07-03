import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ListTribunaisService {
  preSelectedList: any[] = 
  [{ "name": "Supremo Tribunal Federal (STF)" },
  { "name": "Superior Tribunal de Justiça (STJ)" },
  { "name": "Tribunal Superior do Trabalho (TST)" }];

  private listTribunaisUrl: string = 'http://192.168.1.85:3000/court/list';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  }

  listTribunais() { 
    return this.http.get(this.listTribunaisUrl, this.httpOptions);
  }

  listTribunaisPreSelected() {
    return this.preSelectedList;
  }

  sendListToServer(list: any[]){

  }
}

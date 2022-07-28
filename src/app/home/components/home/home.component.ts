import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../core/services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cf: string = "<p>asdasdasdada</p>";

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.request("get", "/law/getcf", null, false).then((resp : any) => {
      this.cf = resp;
    })
  }

  seekart(e) {
    if ( e.length < 3 ) {
      // Faz nada pois tem pouca informacao
      return;
    }
    if ( e.length === 0 ) {
      this.loginService.request("get", "/law/getcf", null, false).then((resp : any) => {
        this.cf = resp;
      })
    }

    if ( e.toUpperCase().indexOf("CF") !== 0 ) {
      this.cf = " APENAS CF e suportado no momento";
    } else {
      this.loginService.request("post", "/law/cita", {parse: e}, false).then((resp : any) => {
        this.cf = resp;
      })
    }
  }

}

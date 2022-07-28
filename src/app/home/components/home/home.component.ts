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

}

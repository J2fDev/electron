import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get onTrial() {
    return true;
  }

  get hasCerti() {
    return false;
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

}

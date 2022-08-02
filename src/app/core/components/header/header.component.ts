import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  state: string = "default";

  get onTrial() {
    return true;
  }

  get hasCerti() {
    return this.loginService.hasCerti;
  }

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  toConfiguration() {
    this.route.navigate(["main/profile"]);
  }

  leave() {
    this.loginService.logout();
    this.route.navigate(["auth"]);
  }

}

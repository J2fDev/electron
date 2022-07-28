import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {onLiChange, onSideNavChange} from '../../animations/sidebar';
import {LoginService} from "../../services/login.service";

@Component({
  animations: [
    onSideNavChange,
    onLiChange
  ],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openMenu: boolean = false;
  isOpen: boolean = false;
  itenSelected: string = "";

  constructor(private route: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  thisIsOpen() {
    this.isOpen = !this.isOpen;
  }

  itenSelection(item: string, path: string) {
    this.itenSelected = item;
    this.loginService.sectionTitle = item;

    if ( path === "sair" ) {

    } else {
      this.route.navigate([path]);
    }
  }
}

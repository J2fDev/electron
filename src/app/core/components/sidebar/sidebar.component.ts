import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {onSideNavChange} from '../../animations/sidebar';
import {LoginService} from "../../services/login.service";

@Component({
  animations: [
    onSideNavChange
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
    console.log("Item selecionado: " + this.itenSelected);
  }

  thisIsOpen() {
    this.isOpen = !this.isOpen;
  }

  itenSelection(item: string, path: string) {
    this.itenSelected = item;
    this.loginService.sectionTitle = item;

    console.log("Clicou no menu: " + this.itenSelected);

    if ( path === "sair" ) {

    } else {
      this.route.navigate([path]);
    }
  }
}

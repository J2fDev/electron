import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {onSideNavChange} from '../../animations/sidebar';
import {ApiService} from '../../services/api.service';

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

  constructor(private route: Router, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  thisIsOpen() {
    this.isOpen = !this.isOpen;
    console.log("OI")
  }

  sendTo(path: string) {
    this.route.navigate([path]);
  }

  itenSelection(item: string, path: string) {
    this.itenSelected = item;
    this.apiService.sectionTitle = item;

    if ( path === "sair" ) {

    } else {
      this.route.navigate([path]);
    }
  }
}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
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
  urlChangeEvent : any = null;

  constructor(private route: Router, private loginService: LoginService, private cd: ChangeDetectorRef) {
    this.urlChangeEvent = route.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        //console.log(val);
        switch ( val.url ) {
          case "/main":
          case "/main/home":
            this.itenSelected = "Home";
            this.loginService.sectionTitle = "Home";
            break;
          case "/main/process":
            this.itenSelected = "Processos";
            this.loginService.sectionTitle = "Processos";
            break;
          case "/main/publication":
            this.itenSelected = "Publicações";
            this.loginService.sectionTitle = "Publicações";
            break;
          case "/main/attendance":
            this.itenSelected = "Atendimentos";
            this.loginService.sectionTitle = "Atendimentos";
            break;
          case "/main/client":
            this.itenSelected = "Clientes";
            this.loginService.sectionTitle = "Clientes";
            break;
          case "/main/calendar":
            this.itenSelected = "Calendar";
            this.loginService.sectionTitle = "Calendar";
            break;
          case "/main/document":
            this.itenSelected = "Modelos";
            this.loginService.sectionTitle = "Modelos";
            break;
          case "/main/profile":
            this.itenSelected = "Configurações";
            this.loginService.sectionTitle = "Configurações";
            break;
          case "/main/help":
            this.itenSelected = "Help";
            this.loginService.sectionTitle = "Help";
            break;
          default:
            this.itenSelected = "";
            this.loginService.sectionTitle = "";
        }
        this.cd.detectChanges();
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.urlChangeEvent.unsubscribe();
  }

  thisIsOpen() {
    this.isOpen = !this.isOpen;
  }

  itenSelection(item: string, path: string) {
    this.itenSelected = item;
    this.loginService.sectionTitle = item;

    if ( path === "sair" ) {
      this.loginService.logout();
      this.route.navigate(["auth"]);
    } else {
      this.route.navigate([path]);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openMenu: boolean = false;
  itenSelected: string = "";
  constructor(private route: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }
log123(){
  console.log("123");
}

sendTo(path: string){
  this.route.navigate([path]);
}

itenSelection(item: string){
  this.itenSelected = item;
  this.apiService.sectionTitle = item;
}
}

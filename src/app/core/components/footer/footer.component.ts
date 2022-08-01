import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public message : string = "Olá, seja bem-vindo(a) ao Único";
  messageEvent: any = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.messageEvent  = this.apiService.messageEvent.subscribe((data: string) => {
      console.log(data);
      this.message = data;
    })

  }

  ngOnDestroy() : void {
    //this.apiService.messageEvent.unsubscribe();
  }

}

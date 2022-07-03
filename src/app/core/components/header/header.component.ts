import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public get title() {
    return this.apiService.sectionTitle;
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }

}

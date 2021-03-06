import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  @Input()
  title: string = "";
  @Input()
  message: string = "";
  @Input()
  type: string = "";
  @Input()
  link: string = "";
  @Input()
  canclose: boolean = false;
  @Input()
  linkText: string = "";

  show: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
  }

}



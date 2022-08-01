import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'auth-backicon',
  templateUrl: './backicon.component.html',
  styleUrls: ['./backicon.component.css']
})
export class BackiconComponent implements OnInit {

  @Input()
  icon: string = "";

  constructor() {
  }

  ngOnInit() {
  }
}


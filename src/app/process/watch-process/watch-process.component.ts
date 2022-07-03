import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch-process',
  templateUrl: './watch-process.component.html',
  styleUrls: ['./watch-process.component.css']
})
export class WatchProcessComponent implements OnInit {

  listOfProcess=[
    {'object': 'object1'},
    {'object': 'object2'}
  ]

  constructor() { }

  ngOnInit(): void {
  }


  catchNewProcess(processReferency: any){

  }
}

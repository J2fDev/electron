import { Component, OnInit } from '@angular/core';
import { CoreComponent } from 'src/app/core/core.component';
@Component({
  selector: 'app-back-board',
  templateUrl: './back-board.component.html',
  styleUrls: ['./back-board.component.css']
})
export class BackBoardComponent implements OnInit {
  classToBackBoard: string = 'backBoard';
  classToBackBoardTool: string = 'backBoardTool';
  title: string = "title";
  constructor(public coreComponent : CoreComponent) { }

  ngOnInit(): void {
  }

  changeFullScreen(){
  this.coreComponent.changeToFullScreen()
  this.classToBackBoard === 'backBoard' ? this.classToBackBoard = 'backBoardFullScreen' : this.classToBackBoard = 'backBoard'
  this.classToBackBoardTool === 'backBoardTool' ? this.classToBackBoardTool = 'backBoardToolFullScreen' : this.classToBackBoardTool = 'backBoardTool'
  }

}

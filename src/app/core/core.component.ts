import { Component } from '@angular/core';

@Component({
  selector: 'core-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {
  title = 'telasj2f';
  fullScreen = true;


  changeToFullScreen(){
    this.fullScreen === true ? this.fullScreen = false : this.fullScreen = true;
  }
}

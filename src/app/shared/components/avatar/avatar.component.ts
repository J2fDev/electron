import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input()
  sizeSelected:string = '';
  @Input()
  imgUrl : string = "";
  @Input()
  nameString : string = '';

  initials = '';
  randomColor = '';

  colors = ['green', 'purple', 'magenta', 'red', 'black', 'pink', 'green'];
  cssClass:string[]= ['small'];

  constructor() { }

  ngOnInit(): void {
      this.initials = this.nameString.split(" ").map((n)=>n[0]).join("");
      if ( this.initials.length > 3 ) this.initials = this.initials.substring(0, 3);
      this.getRandomColor();
      this.cssClass.push(this.sizeSelected);
  }


  getRandomColor(){
     const randomIndex = Math.floor(Math.random() * this.colors.length);
     this.cssClass.push(this.colors[randomIndex]);
  }


}

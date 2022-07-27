import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  imgUrl = "/assets/imgs/marinasilva.jpg";
  nameString = 'Marina Silva';
  initials = '';
  randomColor = '';

  @Input()
  sizeSelected:string = '';

  colors = ['green', 'purple', 'yellow', 'red', 'black', 'pink', 'green'];
  cssClass:string[]= ['small'];

  constructor() { }

  ngOnInit(): void {
      this.initials = this.nameString.split(" ").map((n)=>n[0]).join("");
      this.getRandomColor();
      this.cssClass.push(this.sizeSelected);
  }


  getRandomColor(){
     const randomIndex = Math.floor(Math.random() * this.colors.length);
     this.cssClass.push(this.colors[randomIndex]);
  }


}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-courts',
  templateUrl: './manager-courts.component.html',
  styleUrls: ['./manager-courts.component.css']
})
export class ManagerCourtsComponent implements OnInit {

  courtsSelected: any[] = [];
  preCourtsSelected: any[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  save(){

  }

}
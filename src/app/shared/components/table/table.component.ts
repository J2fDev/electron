import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProcessService } from 'src/app/core/services/process.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }

  addEvent(){
  }

  selectedCss: string = 'Meus Processos'
  arrayOfProcess= this.processService.arrayOfProcess

   
  closeTab(tabName: any){
this.processService.closeTab(tabName)
console.log(tabName);

  }


   logAll(nome: string){
    // console.log(nome);
    this.processService.whoIsOpen(nome)
   }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayOfProcess, event.previousIndex, event.currentIndex);
  }

}

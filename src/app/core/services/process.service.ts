import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  arrayOfProcess:any[] = [
    {
      code: 'Meus Processos',
      click: 'logAll()',
    }
  ]

  windowOpen: string = 'Meus Processos'

  constructor() {

   }

  whoIsOpen(tableOpened: string){
     this.windowOpen = tableOpened;
     console.log(this.windowOpen);
     
  }

  closeTab(tabName: any){
    const index = this.arrayOfProcess.indexOf(tabName)
    console.log(index);
    
      this.arrayOfProcess.splice(index, 1);
  }

  createNewTable(newTableName: any){
      this.arrayOfProcess.push(newTableName)
      console.log(this.arrayOfProcess);
  }
}

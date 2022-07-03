import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { ProcessService } from '../../core/services/process.service';
export interface listaProcessos {
  processo: string;
  tribunal: string;
  partes: string;
  juizo: string;
  lastMov: any;
  category: string;
  grau: string
  processClass: string;
  deliveryDate: string;
  ufJuizo: string;
  movDescription: string;
  isSecreet: boolean;
}

let ELEMENT_DATA: listaProcessos[] = [
  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '1 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Públicae',
    ufJuizo: 'Brasília Df',
     lastMov: '11/04/55',
     movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  }
  ,
  {
    isSecreet: true,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Públicai',
    ufJuizo: 'Brasília Df',
     lastMov: '11/04/55',
     movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  }
  ,
  {
    isSecreet: false,
    tribunal: 'STJ', grau: 'Tribunal Superior',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Públicae',
    ufJuizo: 'Brasília Df',
     lastMov: '11/04/55',
     movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  }
  ,
  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: true,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Públicae',
    ufJuizo: 'Brasília Df',
     lastMov: '11/04/55',
     movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  }
  ,
  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Pública', 
    ufJuizo: 'Brasília Df',
    lastMov: '11/04/55',
    movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  },

  {
    isSecreet: false,
    tribunal: 'STJ', grau: '2 grau',
    processo: '1009883-13.2020.4.01.3807',
    processClass: 'ProceComCiv',
    partes: 'fábio silva Durães X Caixa economica federal',
    juizo: '2ª Vara Empresarial e da Fazenda Públicae',
    ufJuizo: 'Brasília Df',
     lastMov: '11/04/55',
     movDescription: 'Proferido despacho de mero expediente',
    category: 'indenização',
    deliveryDate: '19/11/2020'
  }

];

@Component({
  selector: 'app-manager-process',
  templateUrl: './manager-process.component.html',
  styleUrls: ['./manager-process.component.css']
})

export class ManagerProcessComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  processCtrl = new FormControl('');
  filteredProcess!: Observable<string[]>;
  filters: string[] = [];
  allProcess: string[] = ['STJ', 'STF', 'STT'];
  selection: any[] = [];
  displayedColumns: string[] = ['isSecreet', 'tribunal', 'processo', 'partes', 'juizo', 'lastMov', 'category'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild('filterInput') filterInput: any = '';
  levelsToShow: any;
  newProcessOpen: boolean = false;
  constructor(public processService: ProcessService) {

  }

  windowOpened = this.processService.windowOpen

  ngOnInit(): void {
    console.log(this.windowOpened);


  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.filters.push(value);
    }


    // Clear the input value
    event.chipInput!.clear();

    this.processCtrl.setValue(null);
  }


  remove(fruit: string): void {
    //console.log("Removido: " + fruit);
    const index = this.filters.indexOf(fruit);
    console.log(this.filters);


    if (index >= 0) {
      this.filters.splice(index, 1);
    }

    if (this.filters.length <= 0) {
      console.log(ELEMENT_DATA);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    } else {
      this.updateItens();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filters.push(event.option.viewValue);

    this.updateItens();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProcess.filter(process => process.toLowerCase().includes(filterValue));
  }

  applyFilter(event: any = null) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateItens() {
    let temp = [];

    for (let item of ELEMENT_DATA) {
      for (let filter of this.filters) {
        if (item.processo.trim().toLowerCase() === filter.trim().toLowerCase()) {
          temp.push(item);
          break;
        }
      }
    }

    this.dataSource = new MatTableDataSource(temp);
  }

  openNewProcess(processo: string) {
    this.processService.createNewTable({
      code: processo,

    })
    // this.newProcessOpen = true
    // console.log(this.windowOpened);

  }
  change(event: any) {
    if (event.key === "Enter" || event.key === ",") {
      this.updateItens();
    }

  }
}

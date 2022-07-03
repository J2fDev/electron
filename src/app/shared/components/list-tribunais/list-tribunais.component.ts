import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RoutesService} from "../../../core/services/routes.service";
import {CourtsService} from "../../../core/services/courts.service";
import {ProfileService} from "../../../core/services/profile.service";

@Component({
  selector: 'app-list-tribunais',
  templateUrl: './list-tribunais.component.html',
  styleUrls: ['./list-tribunais.component.css'],
})
export class ListTribunaisComponent implements OnInit {


  @Input()
  type: string = 'selecionar';
  @Input()
  message!: string;
  @Input()
  courts: any = [];
  @Output()
  courtsChange: any = new EventEmitter<any>();
  @Input()
  preCourts: any = [];
  @Output()
  preCourtsChange: any = new EventEmitter<any>();


  filterSearch: string = '';
  result: any = [];
  hideSection: boolean = true;
  maxSelections: number = 5;
  selectedList: any[] = [];
  preSelectedList: any[] = [];
  disableButton: boolean = false;
  preList: any[] = []

  constructor(public http: HttpClient,
    private router: RoutesService,
    private courtsService: CourtsService,
    private profileService: ProfileService,) { }


  // retorna a lista de tribunais
  ngOnInit(): void {
    this.getListInitial()
  }


  async getListInitial() {
    let data = await this.courtsService.getCourts();
    this.filterResult(JSON.stringify(data));
    this.generatePreSelectList();
    console.log(this.result);
  }

  generatePreSelectList() {
    let userAttributes = (JSON.stringify(this.profileService.userAttributes()));

    this.maxSelections = (JSON.parse(userAttributes).manyCourts);

    this.preList = (JSON.parse(userAttributes).courtsPreSelect);
    this.result.forEach((court: any) => {
      if (this.preList.includes(court.id))
        this.preCourts.push(court);
      this.preCourtsChange.emit(this.preCourts)
    })
    this.preList.forEach((newCourt) => {
      this.result.splice(this.result.findIndex((item: any) => item.id == newCourt), 1)
    })
  }

  // retira os tribunais já pré setados para os usuários do unico
  filterResult(data: any) {
    const dataJson = JSON.parse(data);
    this.result = dataJson.filter(((item: any) => {
      return item.id !== 0;
    }))
  }


  select(value: any) {
    if (this.courts.length < this.maxSelections) {
      this.result.splice(this.result.findIndex((item: { id: any; }) => item.id === value.id), 1);
      this.courts.push(value);

    } else {
      alert("Você atingiu o limite de seleções delimitadas por " + this.maxSelections + " tribunais");
    }
    console.log(this.result);
    this.courtsChange.emit(this.courts);

  }

  unSelect(value: any) {
    this.courts.splice(this.courts.findIndex((item: { id: any; }) => item.id === value.id), 1);
    if (this.result.includes(value)) {
      return this.result
    } {
      this.result.push(value);
    }

  }

  continue() {
    this.hideSection = false;
  }

  confirm() {
    this.router.goTo('certify')
  }
}

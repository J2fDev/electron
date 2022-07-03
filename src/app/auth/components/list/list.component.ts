import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from "../../../core/services/api.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  maxSelection: number = 0;
  courtsValue: any[] = [];
  preCourstValue: any[] = [];
  confirmAndHide: boolean = false;
  urlPostCourts = '/profile/courts';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    // this.maxSelection = this.courtService.maxCourtsByPlan();
    console.log(this.preCourstValue);
    // console.log(this.courtsValue);
  }

  continue() {
    console.log(this.courtsValue);
    console.log(this.preCourstValue);
    this.confirmAndHide = true
  }

  confirm() {
    const courts: any[] = [];
    this.courtsValue.map((court) => {
      courts.push(court.id)
    });
    console.log(courts);
    // const sendToCourts = this.courtService.sendCourts(courts)
    let data: any = this.apiService.request("put", this.urlPostCourts, {'courts': courts});
    this.router.navigate(['/profile']);
    // console.log(sendToCourts);

  }

}

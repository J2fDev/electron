import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certify',
  templateUrl: './certify.component.html',
  styleUrls: ['./certify.component.css']
})
export class CertifyComponent implements OnInit {
  list: any[] = [{
    'name': 'JUninho da silva antonio: 147362712398',
    'emissor': 'AB Cetisign CIA G5',
  },
  {
    'name': 'JUninho da silva antonio: 147362712398',
    'emissor': 'AB Cetisign CIA G5',
  },
  {
    'name': 'JUninho da silva antonio: 147362712398',
    'emissor': 'AB Cetisign CIA G5',
  },
  {
    'name': 'JUninho da silva antonio: 147362712398',
    'emissor': 'AB Cetisign CIA G5',
  },]
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'register-sucess',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {

  user={
    username: '',
    userEmail: '',
  }

  x: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private reciveRouter: ActivatedRoute) {
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.reciveRouter.queryParams.subscribe((params: any) => {
      this.x = params['result'];

      const user = JSON.parse(this.x);
      this.user.username = user.fullName;
      this.user.userEmail = user.mail;
      console.log(JSON.parse(this.x));
      });}

  }



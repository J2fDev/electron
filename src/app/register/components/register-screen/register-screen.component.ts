import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { RegisterServiceService } from './register-service.service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent implements OnInit {

  hide: boolean = true;
  ableButton: boolean = true;
  agreeterms: boolean = false;
  emailToConfirm: any;
  errorResponse = ''
  constructor(private registerService: RegisterServiceService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {

  }

  confirmPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  loginForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    doc: ['', [Validators.required,]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern
      ("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{6,50}$")]],
  },
    // {validator: this.confirmPassword('password', 'confirmpassword')
  )

  agreeTerm() {
    (this.agreeterms === false ?
      this.agreeterms = true :
      this.agreeterms = false)
    console.log(this.agreeterms);
  }

  buttonIsAble() {
    if (this.loginForm.valid ===
      true && this.agreeterms === true
    ) {
      this.ableButton = false;
    }
    console.log(this.loginForm.valid)
  }

  logall() {
    console.log(this.loginForm.value);
    const control = this.loginForm.value.agreeterms
    console.log(control);
    this.router.navigate(['/registersucess'])
  }

  log() {
    this.router.navigate(['/login'],);
  }
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  sendToServer() {
    this.registerService.RegisterUser(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        /*this.registerService.RegisterChargebee(this.loginForm.value).subscribe(
          res => {
            console.log(res)
          }
        )*/
        this.router.navigate(['/registersucess'], { queryParams: { result: JSON.stringify(res) } });
      },
      err => this.errorTreatment(err.error.type)
    );
  }



  errorTreatment(errorObject: string) {
    if (errorObject == "INVALID DOC") {
      this.errorResponse = "CPF é inválido";
    }
    else if (errorObject == "DUPLICATED EMAIL") {
      this.errorResponse = "Email já cadastrado";
    } else if (errorObject == "DUPLICATED DOC") {
      this.errorResponse = "CPF já cadastrado";
    }
  }

}

export interface User {
  fullName: string;

  tf: boolean;

  lastLogin: string;
  token: string;


}

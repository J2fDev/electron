import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'auth-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  hide: boolean = false;
  showMessageEmail: boolean = false;
  showButton: boolean = true;
  userInformations:any = []
  buttonDisable: boolean=true;
  inputDisable: boolean=true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.testFunc('gabriel.f.takaki@gmail.com')
  }

  loginForm: FormGroup = this.formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(10)]],
  })


  testFunc(email: string){
    let res= {
      email: email
    }
    this.userInformations = <object>res
  }

  buttonIsAble(){
  let isValid = this.loginForm.valid
  console.log(isValid);

   this.buttonDisable = !isValid
  }

  sendMessage(){
   if( this.showMessageEmail === true){
     this.showMessageEmail = false
   }
   else{
     this.showMessageEmail = true
   }
   this.showButt()
  }

  showButt(){
    if( this.showButton === true){
      this.showButton = false
    }
    else{
      this.showButton = true
    }
    this.showInput()
  }
showInput(){

  this.inputDisable = false
}
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);
  }

  onRegister(){
    this.router.navigate(['/register'])
  }

}


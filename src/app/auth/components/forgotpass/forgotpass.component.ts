import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import {LoginService} from "../../../core/services/login.service";
// import { Cpf } from './cpfClass';
import { User } from './cpfClass';
@Component({
  selector: 'auth-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})


export class ForgotpassComponent implements OnInit {

  hide: boolean = true;
  token: any;
  errorResponse: string = '';
  disableButton: boolean = true;
  loginForm!: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder, private router: Router, ) { }

  ngOnInit() { 
    this.createForm(new User())
  }

  createForm(user: User){
    this.loginForm = this.formBuilder.group({
      login: [user.login, [Validators.required, Validators.minLength(10), this.checkCpf]],
    })
  }


  checkCpf(control: FormControl){
    let vcpf = control.value.replace(/[^\d]+/g,'');
    if(vcpf == '') return {isError: true};
    // Elimina CPFs invalidos conhecidos
    if (vcpf.length != 11 ||
        vcpf == "00000000000" ||
        vcpf == "11111111111" ||
        vcpf == "22222222222" ||
        vcpf == "33333333333" ||
        vcpf == "44444444444" ||
        vcpf == "55555555555" ||
        vcpf == "66666666666" ||
        vcpf == "77777777777" ||
        vcpf == "88888888888" ||
        vcpf == "99999999999")
        return { isError: true};
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i ++)
        add += parseInt(control.value.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(control.value.charAt(9)))
    return {isError: true};
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i ++)
        add += parseInt(control.value.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(control.value.charAt(10)))
    return {isError: true};
    return null;

  }

  onSubmit(){
    console.log(this.loginForm.value);
  }

  onEdit() {
    this.loginForm.valid ? this.disableButton = false : this.disableButton;
  }

backToLogin(){
  this.router.navigate(['/auth']);
}

  async sendToServer() {
    this.loginService.login(this.loginForm.value).then((res: any) => {this.sucessTreatment(res);}
    ).catch((err: any) => {this.ErrorTreatment(err.status)});
  }

  sucessTreatment(res: any) {
    this.token = (res.token);
    console.log(this.token);

    this.loginService.checkAuth(this.token);
    this.router.navigate(['/auth/listtribunais']);
  }

  ErrorTreatment(status: number) {
    if (status == 400) {
      this.errorResponse = "Usuário ou senha inválidos";
    }
    else if (status == 426) {
      this.errorResponse =
        "Problemas com a conexão com o servidor, atualize sua versão e se persistir o problema, entre em contato com o suporte";
    }
    console.log(this.errorResponse);
  }


}


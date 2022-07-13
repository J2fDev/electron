import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './userClass';
import {LoginService} from "../../../core/services/login.service";
import {ChargebeeService} from "../../../core/services/chargebee.service";
import {ElectronService} from "../../../core/services";
import {LocalStorageService} from "../../../core/services/local-storage.service";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  token: any;
  errorResponse: string = '';
  disableButton: boolean = true;
  loginForm!: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder, private router: Router, private chargeBee: ChargebeeService,
              private electronService: ElectronService) { }

  ngOnInit() {
    // Verifica se o token atual ainda é válido e testa junto ao servidor
    if ( this.loginService.token !== null && this.loginService.token !== undefined && this.loginService.token !== "" ) {
      // Token já existe, verifica a validade junto ao servidor

    }

    this.createForm(new User());
  }

  createForm(user: User){
    this.loginForm = this.formBuilder.group({
      login: [user.login, [Validators.required, Validators.minLength(10), this.checkCpf]],
      password: [user.password,  [Validators.required, Validators.minLength(6)]],
      keepLogged: [user.keepLoged]
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

  onEdit() {
    this.loginForm.valid ? this.disableButton = false : this.disableButton;
  }

  async sendToServer() {
    if ( !this.loginForm.valid ) {
      this.ErrorTreatment(-1);
      return;
    }
    this.loginService.login(this.loginForm.value).then((res: any) => {this.sucessTreatment(res);}
    ).catch((err: any) => {this.ErrorTreatment(err.status)});
  }

  sucessTreatment(res: any) {
    this.token = res.token;
    this.loginService.connectSocket();

    this.loginService.checkAuth(this.token);
    this.router.navigate(['/auth/certify']);
  }

  ErrorTreatment(status: number) {
    if (status == 400) {
      this.errorResponse = "Usuário ou senha inválidos";
    }
    else if (status == 426) {
      this.errorResponse =
        "Problemas com a conexão com o servidor, atualize sua versão e se persistir o problema, entre em contato com o suporte";
    } else if ( status === 401 ) {
      this.token = "";

    } else if ( status === -1 ) {
      this.errorResponse = "Verifique se o formulário está corretamente preenchido"
    }
  }


}


import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './userClass';
import {LoginService} from "../../../core/services/login.service";
import {ChargebeeService} from "../../../core/services/chargebee.service";
import * as moment from "moment";


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  errorResponse: string = '';
  errorType: string = "error";
  disableButton: boolean = true;
  loginForm!: FormGroup;
  alertCaps: boolean = false;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder, private router: Router, private chargeBee: ChargebeeService) { }

  ngOnInit() {
    // Verifica se o token atual ainda é válido e testa junto ao servidor
    if ( this.loginService.keepLogged ) {
      //console.log("Marcou para ficar logado");

      if ( this.loginService.token !== null && this.loginService.token !== undefined && this.loginService.token !== "" ) {
        // Token já existe, verifica a validade junto ao servidor
        //console.log("Achou um token e vai tentar validar o mesmo");


        // Tentar chamar primeiro na WEB pq valida e renova
        this.loginService.validateToken()
          .then((resp) => {
            if ( resp.ok ) {
              this.loginService.token = resp.token;
              this.loginService.connectSocket();

              this.loginService.checkAuth(this.loginService.token);
              this.errorType = "info";
              this.errorResponse = "Login ainda é valido direcionar para a pagina prinipal do sistema";
              //this.router.navigate(['/auth/certify']);
            } else {
              // Por algum motivo nao foi possivel validar o token
              // Informacoes da falha na variavel resp.error
              this.errorType =  "error";
              this.errorResponse = resp.err;
            }
          })
          .catch((err) => {
            // Token já não é mais válido
            if ( err.status === 0 ) {
              // Não foi possível conectar com o servidor
              if ( this.loginService.isElectron ) {
                console.log("E electron e vai TENTAR validar localmente");
                // Se for aplicacao electro faz a validacao local
                this.loginService.ipcRenderer.invoke("validatetoken", this.loginService.token).then((resp) => {
                  console.log("Resposta do electron");
                  console.log(resp);

                  // Verifica a validade do token
                  if ( moment().unix() > resp.exp ) {
                    // Token já não e mais válido
                    this.errorType = "warn";
                    this.errorResponse = "O token já não e mais valido. Faća login novamente no sistema."
                  } else {
                    // Token ainda é valido e permite o acesso
                    // No caso vamos pular a parte de certificado pois o mesmo nao tem necessidade off line
                    this.errorType = "info";
                    this.errorResponse = "Login ainda é valido direcionar para a pagina prinipal do sistema";
                  }

                }).catch((err) => {
                  console.log("ERRO NO INVOKE");
                  console.log(err);
                })
              } else {
                console.log("Versao WEB so exibir problemas com a conexao")
              }

            } else {
              console.log(err)
            }

          });

      } else {
        console.log("Não existe token armazenado");
      }
    } else {
      console.log("Nao deve permanecer logado");
    }

    this.createForm(new User());
    this.loginForm.controls["keepLogged"].setValue(this.loginService.keepLogged);
  }

  clearLocalStorage() {
    window.localStorage.clear();
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

  capsOn(e) {
    if ( e.key === "CapsLock" ) {
      this.alertCaps = !this.alertCaps;
    } else {
      if (e.getModifierState('CapsLock')) {
        this.alertCaps = true;
      } else {
        this.alertCaps = false;
      }
    }
  }

  sendToServer() {
    if ( !this.loginForm.valid ) {
      this.ErrorTreatment(-1);
      return;
    }
    this.loginService.login(this.loginForm.value).then((res: any) => {this.sucessTreatment(res);}
    ).catch((err: any) => {this.ErrorTreatment(err.status)});
  }

  sucessTreatment(res: any) {
    this.loginService.connectSocket();

    this.loginService.checkAuth(this.loginService.token);
    this.router.navigate(['/auth/certify']);
  }

  ErrorTreatment(status: number) {
    if (status == 400) {
      this.errorResponse = "Usuário ou senha inválidos";
      this.errorType = "error";
    }
    else if (status == 426) {
      this.errorResponse =
        "Problemas com a conexão com o servidor, atualize sua versão e se persistir o problema, entre em contato com o suporte";
      this.errorType = "error";
    } else if ( status === 401 ) {
      this.loginService.token = "";
    } else if ( status === 0 ) {
      this.errorResponse = "Não foi possível contactar o servidor. Verifique sua conexão com a internet e se necessário entre em contato com o suporte."
      this.errorType = "error";
    } else if ( status === -1 ) {
      this.errorResponse = "Verifique se o formulário está corretamente preenchido";
      this.errorType = "error";
    }
  }


}


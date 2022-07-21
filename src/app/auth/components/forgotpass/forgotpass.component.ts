import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import {Router} from '@angular/router';
import {LoginService} from "../../../core/services/login.service";
import {User} from './cpfClass';

@Component({
  selector: 'auth-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  errorResponse: string = '';
  loginForm!: FormGroup;
  success: boolean = false;
  mail: string = "joao******@gmail.com";

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.createForm(new User())
  }

  createForm(user: User) {
    this.loginForm = this.formBuilder.group({
      doc: [user.doc, [Validators.required, Validators.minLength(10), this.checkCpf]],
    })
  }

  checkCpf(control: FormControl) {
    let vcpf = control.value.replace(/[^\d]+/g, '');
    if (vcpf == '') return {isError: true};
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
      return {isError: true};
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(control.value.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(control.value.charAt(9)))
      return {isError: true};
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(control.value.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(control.value.charAt(10)))
      return {isError: true};
    return null;

  }

  backToLogin() {
    this.router.navigate(['/auth']);
  }

  async sendToServer() {
    this.loginService.forgot(this.loginForm.value).then((res: any) => {
        this.sucessTreatment(res);
      }
    ).catch((err: any) => {
      this.ErrorTreatment(err.status)
    });
  }

  sucessTreatment(res: any) {
    this.success = true;
    this.mail = res.msg;
  }

  ErrorTreatment(status: number) {
    console.log(this.errorResponse);

    switch ( status ) {

      default:
        console.log(status);
    }
  }


}


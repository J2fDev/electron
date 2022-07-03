import { Component, Input, OnInit, Output,  EventEmitter, AfterViewInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {IbgeService} from "../../../core/services/ibge.service";
import { Adress } from './adressClass';

@Component({
  selector: 'app-adress-forms',
  templateUrl: './adress-forms.component.html',
  styleUrls: ['./adress-forms.component.css']
})
export class AdressFormsComponent implements OnInit {

  @Input()
  type: any
  @Input()
  values: Adress[] = []
  @Output()
  valuesChange: any = new EventEmitter<any>()

  cidades: any[] = []
  adressForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public ibgeService: IbgeService) { }

    ngOnInit(): void {
      this.createForm(new Adress() )
    }

    // ngAfterViewInit(){
    //   this.reactiveForm.get("firstname").valueChanges.subscribe(x => {
    //     console.log('firstname value changed')
    //     console.log(x)
    // }


    createForm(adress: Adress){
      this.adressForm = this.formBuilder.group({
        id: [adress.tipo + adress.logradouro ] ,
        tipo: [adress.tipo, [Validators.required, Validators.minLength(3), ]],
        logradouro: [adress.logradouro, [Validators.required, Validators.minLength(3)]],
        bairro:[adress.bairro, [Validators.required, Validators.minLength(3)]],
        cep: [adress.cep, [Validators.required, Validators.minLength(3)]],
        numero: [adress.numero, [Validators.required, Validators.minLength(3)]],
        complemento: [adress.complemento, [Validators.required, Validators.minLength(1)]],
        estado: [adress.estado, [Validators.required, Validators.minLength(1)]],
        cidade: [adress.cidade,],
      })
    }

  addAdress: boolean = this.values.length === 0;

  arrayOfAdress:Adress[] = [
    ];

  save(){
    this.values.push(this.adressForm.value)
    this.addAdress = false;
   this.valuesChange.emit(this.values);
   console.log(this.values);
  }



 async setCitie(evento: any){

   this.cidades = await this.ibgeService.getCities(evento)
   console.log(this.cidades);
   console.log(this.adressForm.value);

 }

submit(){
  console.log(this.adressForm.value);

}


}

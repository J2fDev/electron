import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {IbgeService} from "../../../core/services/ibge.service";
import {Adress} from './adressClass';
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-adress-forms',
  templateUrl: './adress-forms.component.html',
  styleUrls: ['./adress-forms.component.css']
})
export class AdressFormsComponent implements OnInit {

  @Input()
  type: any;
  @Input()
  set values(values) {
    this.ivalues = values;
    this.addAdress = this.ivalues.length === 0;
  }

  get values() {
    return this.ivalues;
  }

  @Output()
  valuesChange: any = new EventEmitter<any>();

  ivalues: Adress[] = [];
  addAdress: boolean = true;

  cidades: any[] = [];
  adressForm!: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, public ibgeService: IbgeService) {
  }

  ngOnInit(): void {
    this.createForm(new Adress());

    this.addAdress = this.ivalues.length === 0;
  }


  createForm(adress: Adress) {
    this.adressForm = this.formBuilder.group({
      id: [adress.tipo + adress.logradouro],
      tipo: [adress.tipo, [Validators.required, Validators.minLength(3),]],
      logradouro: [adress.logradouro, [Validators.required, Validators.minLength(3)]],
      bairro: [adress.bairro, [Validators.required, Validators.minLength(3)]],
      cep: [adress.cep, [Validators.required, Validators.minLength(5)]],
      numero: [adress.numero, [Validators.required, Validators.minLength(1)]],
      complemento: [adress.complemento, [Validators.required, Validators.minLength(1)]],
      estado: [adress.estado, [Validators.required, Validators.minLength(1)]],
      cidade: [adress.cidade, [Validators.required, Validators.minLength(1)]],
    })
  }

  saveAddress(valid: boolean) {
    if ( valid ) {
      this.values.push(this.adressForm.value);
      this.addAdress = false;
      this.valuesChange.emit(this.values);
      this.adressForm.reset();
    }
  }


  async setCitie(evento: any) {
    const cidad = await this.ibgeService.getCities(evento);
    this.cidades = [];
    cidad.forEach((cidade: any) => {
      this.cidades.push(cidade.nome)
    });
    this.cidades.sort((a, b) => a.localeCompare(b));
  }

  submit() {
    console.log(this.adressForm.value);
  }

}

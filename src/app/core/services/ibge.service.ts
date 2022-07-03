import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IbgeService extends ApiService {
  ufs: any = [];
  cities: any = new Map();

  constructor(private http: HttpClient) {
    super(http);
    this.getUfs();
  }

  /**
   * Recupera as informaćões das UFs do brasil e salva internamente
   */
  async getUfs() {
    let now = new Date();
    this.ufs = await this.external("get", "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
    return this.ufs;
  }

  /**
   * Recupera as cidades da UF informada
   * @param sigla
   *
   * @return Array{Objects} - {id: number, nome: string}
   */
  async getCities(sigla: string) {
    if ( this.cities.has(sigla) ) {
      return this.cities.get(sigla);
    }

    let selected : any = {};
    for ( let iuf of this.ufs ) {
      if ( iuf.sigla === sigla) {
         selected = iuf;
         break;
      }
    }

    if ( selected === {} ) return [];

    this.cities.set(sigla, await this.external("get",
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selected.id + "/municipios"));

    return this.cities.get(sigla);
  }

  /**
   * Recupera as cidades pela ID da UF do igbe
   * @param sigla
   *
   * @return Array{Objects} - {id: number, nome: string}
   */
  async getCitiesById(id: number) {
    let selected : any = {};
    for ( let iuf of this.ufs ) {
      if ( iuf.id === id) {
        selected = iuf;
        break;
      }
    }

    if ( selected === {} ) return [];

    if ( this.cities.has(selected.sigla) ) {
      return this.cities.get(selected.sigla);
    }

    this.cities.set(selected.sigla, await this.external("get",
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selected.id + "/municipios"));

    return this.cities.get(selected.sigla);
  }

  /**
   * Recupera os dados do CEP informado
   * @param cep
   *
   * * @return Array{Objects} - {cep: string, logradouro: string, complemento: string, bairro: string,
   *  localidade: string, uf: string, ibge: number, gia: number, ddd: number, siafi: number}
   */
  async getCep(cep: string) {
    let codigo = cep.replace(".", "").replace("-", "").trim();
    return await this.external("get", "viacep.com.br/ws/" + codigo + "/json/");
  }


}

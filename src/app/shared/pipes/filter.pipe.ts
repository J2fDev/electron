import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarTribunais',
  pure: false
})
export class FiltrarTribunaisPipe implements PipeTransform {

  transform(tribunais: any[], filtro: string): any[] {

    const resultado: any = [];

    for (const t of tribunais){
      // console.log(t);
      
      if (t.name.toUpperCase().includes(filtro.toUpperCase()) ||
       t.group.toUpperCase().includes(filtro.toUpperCase()) ||
        t.uf.includes(filtro.toUpperCase())){
        resultado.push(t);
      }
  }

    return resultado;
  }

}

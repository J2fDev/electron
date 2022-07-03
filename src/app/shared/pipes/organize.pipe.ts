import { Pipe, PipeTransform } from '@angular/core';
// import sortBy from 'sort-by';
const sortBy = require('sort-by');

@Pipe({
  name: 'organize'
})
export class OrganizePipe implements PipeTransform {

  transform(list: object[], params?: string): any {
    if(params?.length){
      return list.sort(sortBy(params))
  }
  return list;
  }
}

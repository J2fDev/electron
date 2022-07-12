import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    // this.storage = window.localStorage;
  }

  getAllData(): string {
    const values = Object.values(localStorage);
    const data = JSON.stringify(values);
    return data;
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  setData(key: string, value: string) {
    const keyData = JSON.stringify(key);
    const valueData = JSON.stringify(value);
    localStorage.setItem(keyData, valueData);
  }
}

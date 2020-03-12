import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor() { }

  public direccionServer(){
    return 'http://172.16.214.70'
  }

  public puerto(){
    return '5000'
  }
}

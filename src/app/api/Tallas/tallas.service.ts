import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from '../Configuracion/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class TallasService {
server = this.config.direccionServer() + ':' + this.config.puerto();

  constructor( 
    public http : HttpClient,
    private config : ConfiguracionService
    ) { }

    getTallas(): Observable<any>{
      return this.http.get(this.server + '/Tallas/getTallas',{})
    }
}

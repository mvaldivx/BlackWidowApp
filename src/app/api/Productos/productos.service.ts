import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionService } from '../Configuracion/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
server = this.config.direccionServer() + ':' + this.config.puerto();
  constructor(
    public http : HttpClient,
    private config : ConfiguracionService
  ) {

   }

  getProductos(params): Observable<any>{
    return this.http.get(this.server + '/Productos/getProductos',{params:params})
  }

  getInfoProducto(idProducto):Observable<any>{
    return this.http.get(this.server + '/Productos/getInfoProducto',{params:{_id:idProducto}})
  }

  getColores(idProducto): Observable<any>{
    return this.http.get(this.server + 'Productos/getColores',{params:{_id:idProducto}})
  }
}

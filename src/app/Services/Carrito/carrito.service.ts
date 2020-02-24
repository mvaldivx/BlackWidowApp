import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators';
import { carrito } from './carrito.interface';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor(
    private storage: Storage
  ) { }

  
  private readonly _carrito = new BehaviorSubject<carrito>(
    {
      productos:[{
        precio: 0,
        cantidad: 0,
        idProducto: '',
        Nombre: 'default',
        color: '',
        talla:'',
        subtotal: 0
      }]
    });

    readonly carrito$ = this._carrito.asObservable();

    get carrito(): carrito{
      return this._carrito.getValue();
    } 

    set carrito(val: carrito){
      this._carrito.next(val);
    }

    async changeCarrito(carrito: carrito){
      var aux = {... carrito}
      this.storage.set('carrito',aux)
      this.carrito = aux
    }
}

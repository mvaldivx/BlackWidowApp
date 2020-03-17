import { Component } from '@angular/core';
import { CarritoService } from '../Services/Carrito/carrito.service';
import { carrito } from '../Services/Carrito/carrito.interface'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
productos= []
  constructor(
    private carritoServ: CarritoService,
    private storage: Storage
  ) {
    var prod: carrito = {productos:[]}
    this.storage.get('carrito').then(c=>{
      if(c){
        prod.productos = c.productos
        this.carritoServ.changeCarrito(prod)
      }
      this.carritoServ.carrito$.subscribe(prod=>{
        if(prod && prod.productos[0].Nombre != 'default'){
          this.productos = prod.productos
        }
      })
    })
  }

}

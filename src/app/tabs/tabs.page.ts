import { Component } from '@angular/core';
import { CarritoService } from '../Services/Carrito/carrito.service';
import { carrito } from '../Services/Carrito/carrito.interface'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
 numproductos = 0
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
        if(prod){
          this.numproductos = prod.productos.length
        }
      })
    })
  }

}

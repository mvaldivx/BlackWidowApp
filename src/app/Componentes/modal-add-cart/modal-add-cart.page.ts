import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductosService } from '../../api/Productos/productos.service';
import { Socket } from 'ngx-socket-io';
import { UtilsService } from '../../Utils/utils.service'
import { CarritoService } from '../../Services/Carrito/carrito.service'
import { carrito } from '../../Services/Carrito/carrito.interface'
import { AlertComponent } from '../Utils/alert/alert.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.page.html',
  styleUrls: ['./modal-add-cart.page.scss'],
})
export class ModalAddCartPage implements OnInit {
Producto = {}
Tallas = []
talla:string= ''
color:string= ''

  constructor(
    private modalCtrl: ModalController,
    private NavParams : NavParams,
    private socket : Socket,
    private ProductosService: ProductosService,
    private utils: UtilsService,
    private carritoServ: CarritoService,
    private alrtComp : AlertComponent,
    private storage: Storage
  ) {
    if(this.NavParams.get('Producto')){
      this.Producto = this.NavParams.get('Producto')
      this.getInfoProducto(this.Producto['IdProducto'])
      
    }
   }

  ngOnInit() {
    this.socket.connect();
    var prod = this.NavParams.get('Producto')
    this.socket.on('colorDisp'+prod.IdProducto,colores =>{
      this.getInfoProducto(prod.IdProducto)
    })

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  getInfoProducto(idprod){
    this.ProductosService.getInfoProducto(idprod).subscribe(r=>{
      var Colores = new Array
      r.Tallas.forEach(t=>{
        t.Colores.forEach(c=>{
          var existe = false
          Colores.forEach(cg =>{
            if(cg.Color === c.Color)
              existe = true
          })
          if(!existe)
            Colores.push({Color:c.Color})
        })
      })
      if(Colores.length === 1){
        this.color = Colores[0].Color
      }
      r['Colores'] = Colores
      this.Tallas = r['Tallas'].filter(function (ta) {
        return ta.Talla
      })
      this.Producto = r;
    })
  }

  formatText(text){
    return this.utils.formatText(text)
  }

  agregaraCarrito(){
    if(this.color != '' && this.talla != ''){
      var carrito: carrito
      var prod: carrito = {productos:[]}
      this.storage.get('carrito').then(c=>{
        if(c){
          prod.productos = c.productos
          this.carritoServ.changeCarrito(prod)
        }

        var subscription = this.carritoServ.carrito$.subscribe(prod=>{
          carrito  = prod
        })
        subscription.unsubscribe();
        
        if(carrito.productos[0].Nombre === 'default'){
          prod.productos.push({
            precio: this.Producto['Precio'],
            cantidad: 1,
            idProducto: this.Producto['IdProducto'],
            Nombre: this.Producto['Nombre'],
            color: this.color,
            talla: this.talla,
            subtotal: this.Producto['Precio']
          })
          this.carritoServ.changeCarrito(prod)
        }else{
          var modificado = false
          carrito.productos.forEach(p=>{
            if(p['idProducto'] === this.Producto['IdProducto'] && p['color'] === this.color && p['talla'] === this.talla){
              p.cantidad = parseFloat(p.cantidad.toString()) + 1
              p.subtotal = parseFloat(p.precio.toString()) * parseFloat(p.cantidad.toString())
              modificado = true
            }
          })
          if(modificado){
            this.carritoServ.changeCarrito(carrito)
          }else{
            prod.productos.push({
              precio: this.Producto['Precio'],
              cantidad: 1,
              idProducto: this.Producto['IdProducto'],
              Nombre: this.Producto['Nombre'],
              color: this.color,
              talla: this.talla,
              subtotal: this.Producto['Precio']
            })
            this.carritoServ.changeCarrito(prod)
          }
        }
        this.modalCtrl.dismiss();
      })
      
      
    }else{
      this.alrtComp.alerta('falta seleccionar talla o color')
    }
    
  }

  CambioTalla(t){
    this.talla = t;
    var env = this;
    if(this.Producto['Tallas'].filter(function(r){return(r.Talla === t)})[0].Colores
    .filter(function(c){return(c.Color === env.color)}).length === 0)
      env.color = ''
    this.Producto['Colores'] = this.Producto['Tallas'].filter(function(r){return(r.Talla == t)})[0].Colores
  }

}

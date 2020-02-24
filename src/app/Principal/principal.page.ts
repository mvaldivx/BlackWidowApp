import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../api/Productos/productos.service';
//import { Socket } from 'ngx-socket-io';
import { ModalController } from '@ionic/angular';
import { ModalAddCartPage } from '../Componentes/modal-add-cart/modal-add-cart.page'
import { UtilsService } from '../Utils/utils.service'
import { myEnterAnimation, myLeaveAnimation } from '../Transitions/Transition'

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class PrincipalPage implements OnInit{
  paginacion = 0;
  Productos = [];

  constructor(
    private ProductosApi : ProductosService,
    //private socket : Socket,
    private modalCtrl: ModalController,
    private Utils: UtilsService
  ) {
    this.getProductos()
  }

  ngOnInit() {

  }

  getProductos(){
    this.ProductosApi.getProductos({posicion:this.paginacion}).subscribe(res=>{
      res.forEach(element => {
        var Colores = new Array
        element.Tallas.forEach(t=>{
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
        element['Colores'] = Colores
        // this.getColores(element._id)
      });
      this.Productos = res;
    })
  }

  getColores(idProducto){
    this.ProductosApi.getColores(idProducto).subscribe(c =>{
      return c
    })
  }

  formatText(cad){
    return this.Utils.formatText(cad)
  }

  async addCarrito(Prod){
    const modal = await this.modalCtrl.create({
      component: ModalAddCartPage,
      cssClass:'my-custom-modal-css',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps:{
        Producto:Prod
      }
    })
    return await modal.present();
  }


}

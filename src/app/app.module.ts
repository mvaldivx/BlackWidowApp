import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { ProductosService } from './api/Productos/productos.service';
import { ConfiguracionService } from './api/Configuracion/configuracion.service'
import { TallasService } from './api/Tallas/tallas.service';
import { UtilsService } from './Utils/utils.service'
import { CarritoService } from './Services/Carrito/carrito.service'

import { AlertComponent } from './Componentes/Utils/alert/alert.component'

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://172.16.214.70:5000', options: {} };

import { ModalAddCartPageModule } from './Componentes/modal-add-cart/modal-add-cart.module'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ModalAddCartPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProductosService,
    ConfiguracionService,
    TallasService,
    UtilsService,
    CarritoService,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

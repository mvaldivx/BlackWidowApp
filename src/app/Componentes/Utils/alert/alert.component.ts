import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(
    private AlertCtrl: AlertController
  ) { }

  ngOnInit() {}

  alerta(msg){
    this.presentAlert(msg);
  }

  async presentAlert(msg){
    const alert = await this.AlertCtrl.create({
      header: 'Alerta',
      message: msg,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}

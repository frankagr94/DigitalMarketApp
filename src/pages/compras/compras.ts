import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';

/**
 * Generated class for the ComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compras: Array<{imagen: string, nombre: string, precio: string, fecha: string;}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.compras = [
      { imagen: 'assets/imgs/articulos/cornetas.png', nombre: 'Cornetas PC', precio: '1.500.000', fecha: '10-01-2018' },
      { imagen: 'assets/imgs/articulos/monitor.png', nombre: 'Monitor LCD', precio: '10.500.000', fecha: '05-03-2018' },
      { imagen: 'assets/imgs/articulos/equipo.png', nombre: 'Equipo de Sonido', precio: '20.999.000', fecha: '22-11-2016' },
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

  search() {
  }

}

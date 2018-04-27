import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  activas: Array<{imagen: string, nombre: string, precio: string;}>;
  cerradas: Array<{imagen: string, nombre: string, precio: string, fecha: string;}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.activas = [
      { imagen: 'assets/imgs/articulos/cornetas.png', nombre: 'Cornetas PC', precio: '1.500.000' },
      { imagen: 'assets/imgs/articulos/monitor.png', nombre: 'Monitor LCD', precio: '10.500.000' },
    ]

    this.cerradas = [
      { imagen: 'assets/imgs/articulos/zapatos.png', nombre: 'Zapatos Nike', precio: '3.999.000', fecha: '10-01-2018' },
      { imagen: 'assets/imgs/articulos/reloj.png', nombre: 'Reloj Polo Ralph', precio: '1.100.000', fecha: '05-03-2018' },
      { imagen: 'assets/imgs/articulos/cocina.png', nombre: 'Cocina 4 Hornillas', precio: '250.000.000', fecha: '22-11-2016' },
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentasPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

}

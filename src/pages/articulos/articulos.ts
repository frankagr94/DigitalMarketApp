import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleArticuloPage } from '../detalle-articulo/detalle-articulo';
import { CarritoPage } from '../carrito/carrito';

/**
 * Generated class for the ArticulosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articulos',
  templateUrl: 'articulos.html',
})
export class ArticulosPage {

  populares: Array<{imagen: string, nombre: string, precio: string, likes: string, component: any;}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.populares = [
      { imagen: 'assets/imgs/articulos/cornetas.png', nombre: 'Cornetas PC', precio: '1.500.000', likes: '4.0', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/monitor.png', nombre: 'Monitor LCD', precio: '10.500.000', likes: '4.5', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/equipo.png', nombre: 'Equipo de Sonido', precio: '20.999.000', likes: '4.7', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/pendrive.png', nombre: 'Pendrive Kingston 16gb', precio: '2.488.000', likes: '5.0', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/cable.png', nombre: 'Cable VGA', precio: '300.000', likes: '3.9', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/franela.png', nombre: 'Franela Quicksilver', precio: '1.899.000', likes: '4.3', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/cocina.png', nombre: 'Cocina 4 Hornillas', precio: '250.000.000', likes: '4.6', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/reloj.png', nombre: 'Reloj Polo Ralph', precio: '1.100.000', likes: '3.5', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/zapatos.png', nombre: 'Zapatos Nike', precio: '3.999.000', likes: '4.0', component: DetalleArticuloPage },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticulosPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

}

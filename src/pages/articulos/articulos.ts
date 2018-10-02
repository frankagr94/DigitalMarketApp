import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleArticuloPage } from '../detalle-articulo/detalle-articulo';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { ServicioProvider } from '../../providers/servicio/servicio';

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

  articulos: any;
  idcategoria: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio: ServicioProvider) {
    this.idcategoria = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticulosPage');
    this.cargarPublicaciones(this.idcategoria);
  }

  cargarPublicaciones(idcategoria){
    this.servicio.getPublicacionesPorCategoria(idcategoria).subscribe(res => {
      let body = res.json();
      this.articulos = body;
      console.log(body);
    });
  }

  verArticulo(art) {
    this.navCtrl.push(DetalleArticuloPage, {
      data: art
    });
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

}

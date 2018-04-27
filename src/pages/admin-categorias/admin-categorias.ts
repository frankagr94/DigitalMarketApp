import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticulosPage } from '../articulos/articulos';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';

/**
 * Generated class for the AdminCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-categorias',
  templateUrl: 'admin-categorias.html',
})
export class AdminCategoriasPage {

  categorias: Array<{imagen: string, nombre: string, component: any;}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categorias = [
      { imagen: 'assets/imgs/categorias/electrodomesticos.png', nombre: 'Electrodomesticos', component: ArticulosPage },
      { imagen: 'assets/imgs/categorias/deporte.png', nombre: 'Deporte', component: ArticulosPage },
      { imagen: 'assets/imgs/categorias/hogar.png', nombre: 'Hogar', component: ArticulosPage },
      { imagen: 'assets/imgs/categorias/Comida.png', nombre: 'Comida', component: ArticulosPage },
      { imagen: 'assets/imgs/categorias/Moda.png', nombre: 'Moda', component: ArticulosPage },
      { imagen: 'assets/imgs/categorias/Juguetes.png', nombre: 'Juguetes', component: ArticulosPage }
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCategoriasPage');
  }

  openCategoria(page) {
    this.navCtrl.setRoot(page.component);
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}

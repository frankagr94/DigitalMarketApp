import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArticulosPage } from '../articulos/articulos';
import { CarritoPage } from '../carrito/carrito';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

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

  openCategoria(page) {
    this.navCtrl.setRoot(page.component);
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }
  
}

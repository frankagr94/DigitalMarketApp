import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';


/**
 * Generated class for the DetalleArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-articulo',
  templateUrl: 'detalle-articulo.html',
})
export class DetalleArticuloPage {

  articulo: any
  usuario: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice: LoginservicioProvider, public servicio: ServicioProvider) {
    this.articulo = this.navParams.get('data');
    this.usuario = this.loginservice.getUsuarioInfo();
  }

  ionViewDidLoad() {
    console.log(this.articulo);
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    if(this.loginservice.getUsuarioInfo()==null)
      {this.navCtrl.setRoot(HomePage);}
      else this.navCtrl.setRoot(TimelinePage);
  }

}

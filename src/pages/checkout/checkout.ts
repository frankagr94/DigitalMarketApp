import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  monto: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.monto = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

}

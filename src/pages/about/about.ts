import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  rootPage: any = CarritoPage;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private loginservice: LoginservicioProvider) {
    this.usuario = loginservice.getUsuarioInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  goHome() {
    if(this.loginservice.getUsuarioInfo()==null)
      {this.navCtrl.setRoot(HomePage);}
      else this.navCtrl.setRoot(TimelinePage);
  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }

}

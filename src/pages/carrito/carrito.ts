import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { HomePage } from '../home/home';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { TimelinePage } from '../timeline/timeline';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  articulos: any[] = [];;
  monto: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private imageLoaderConfig: ImageLoaderConfig, private loginservice: LoginservicioProvider, public servicio: ServicioProvider, private toastCtrl: ToastController) {
    this.cargarArticulos();
    this.imageLoaderConfig.setFallbackUrl('http://res.cloudinary.com/digitalmarket/image/upload/v1528924814/sin_imagen.png');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }

  cargarArticulos(){
    this.servicio.getCarritoDeUsuario(this.loginservice.getUsuarioInfo().id).subscribe(res => {
      let body = res.json();
      this.articulos = body;
      console.log(this.articulos);
      this.monto = 0;
      this.articulos.forEach(element => {
        this.monto += element.articulo.precio
      });
    });
  }

  quitarDelCarrito(id){
    this.servicio.eliminarArticuloCarrito(id);
    this.cargarArticulos();
    this.presentarMensaje();
    this.navCtrl.setRoot(CarritoPage);
    this.navCtrl.setRoot(CarritoPage);
  }

  search() {
  }

  goToCheckout(monto) {
    this.navCtrl.push(CheckoutPage, {
      data: monto
    });
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

  presentarMensaje() {
    let toast = this.toastCtrl.create({
      message: 'Articulo eliminado exitosamente!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

    public logout() {
      this.loginservice.logout().subscribe(succ => {
        this.navCtrl.setRoot(HomePage);
        this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
      });
    }

    doRefresh(refresher) {
        refresher.complete();
        this.cargarArticulos();
        console.log('refrescado');
    }
  
}

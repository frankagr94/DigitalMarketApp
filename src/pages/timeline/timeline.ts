import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { HomePage } from '../home/home';

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  articulos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imageLoaderConfig: ImageLoaderConfig, private loginservice: LoginservicioProvider, public events: Events, public servicio: ServicioProvider, private toastCtrl: ToastController) {
    this.imageLoaderConfig.setFallbackUrl('http://res.cloudinary.com/digitalmarket/image/upload/v1528924814/sin_imagen.png');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
    console.log(this.loginservice.getUsuarioInfo().nombre);
    this.cargarPublicaciones();
  }

  cargarPublicaciones(){
    this.servicio.getPublicacionesFullInfo().subscribe(res => {
      let body = res.json();
      this.articulos = body;
      console.log(body);
    });
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  search(){
  }

  openArticulo(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

  agregarAlCarrito(idarticulo){
    console.log(idarticulo);
    this.servicio.agregarAlCarrito(idarticulo, this.loginservice.getUsuarioInfo().id);
    this.presentarMensaje();
    setTimeout(() => {
      this.navCtrl.setRoot(CarritoPage);
    }, 2000); 
  }

  presentarMensaje() {
    let toast = this.toastCtrl.create({
      message: 'Articulo agregado exitosamente!',
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
      this.cargarPublicaciones();
      console.log('refrescado');
    }

    doLike(idpublicacion, like: HTMLLabelElement){
      this.servicio.registrarLike(this.loginservice.getUsuarioInfo().id, idpublicacion).subscribe(res =>{
        var resp = res.json();
        console.log("Like Registrado a:"+resp.usuarioId);
        this.cargarPublicaciones();
      })
    }

}

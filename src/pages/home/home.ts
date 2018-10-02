import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Slides,Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ArticulosPage } from '../articulos/articulos';
import { CarritoPage } from '../carrito/carrito';
import { DetalleArticuloPage } from '../detalle-articulo/detalle-articulo';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('adSlider') slider: Slides;
  banners: String[];
  populares: Array<{imagen: string, nombre: string, precio: string, likes: string, component: any;}>;

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    private ga: GoogleAnalytics) {

      this.platform.ready().then(() => {
        this.ga.trackView("Home Page");
      });

    this.banners = [
      'assets/imgs/banner1.png',
      'assets/imgs/banner2.png',
      'assets/imgs/banner3.png'
    ]

    this.populares = [
      { imagen: 'assets/imgs/articulos/cornetas.png', nombre: 'Cornetas PC', precio: '1.500.000', likes: '4.0', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/monitor.png', nombre: 'Monitor LCD', precio: '10.500.000', likes: '4.5', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/equipo.png', nombre: 'Equipo de Sonido', precio: '20.999.000', likes: '4.7', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/pendrive.png', nombre: 'Pendrive Kingston 16gb', precio: '2.488.000', likes: '5.0', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/cable.png', nombre: 'Cable VGA', precio: '300.000', likes: '3.9', component: DetalleArticuloPage },
      { imagen: 'assets/imgs/articulos/franela.png', nombre: 'Franela Quicksilver', precio: '1.899.000', likes: '4.3', component: DetalleArticuloPage }
    ]

  }
  
  ionViewDidLoad() {
   
  }

  trackEvent() {
    let active = this.slider.getActiveIndex();
    this.platform.ready().then(() => {
      this.ga.trackEvent("Slider", "Slider-Changed", "Label", active);
    });
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  search() {
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(ArticulosPage);
  }

  openArticulo(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

}

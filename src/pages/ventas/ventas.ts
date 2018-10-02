import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { TimelinePage } from '../timeline/timeline';

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  activas: any;
  cerradas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private loginservice: LoginservicioProvider, public servicio: ServicioProvider) {

  }

  ionViewDidLoad() {
    this.cargarActivas();
    this.cargarCerradas();
    console.log('ionViewDidLoad VentasPage');
  }

  cargarActivas(){
    this.servicio.getPublicacionesDeUsuario(this.loginservice.getUsuarioInfo().id, true).subscribe(res => {
      let body = res.json();
      this.activas = body;
      console.log(this.activas);
    });
  }

  cargarCerradas(){
    this.servicio.getPublicacionesDeUsuario(this.loginservice.getUsuarioInfo().id, false).subscribe(res => {
      let body = res.json();
      this.cerradas = body;
      console.log(this.activas);
    });
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    this.navCtrl.setRoot(TimelinePage);
  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }

  doRefresh(refresher) {
    refresher.complete();
    this.cargarActivas();
    this.cargarCerradas();
    console.log('refrescado');
  }

  cerrarPublicacion(id){
    let postParams = {
      estatus: false
    }
    this.servicio.editarPublicacion(id, postParams).subscribe(res =>{
      console.log(res.json())
      this.cargarActivas();
      this.cargarCerradas();
    }, error => {
      console.log(error);// Muestra error en consola
    });
  }

  eliminarPublicacion(id){
    this.servicio.eliminarPublicacion(id).subscribe(res =>{
      console.log('Eliminada exitosamente')
      this.cargarActivas();
      this.cargarCerradas();
    }, error => {
      console.log(error);// Muestra error en consola
    });
  }

  activarPublicacion(id){
    let postParams = {
      estatus: true
    }
    this.servicio.editarPublicacion(id, postParams).subscribe(res =>{
      console.log('Activada exitosamente')
      this.cargarActivas();
      this.cargarCerradas();
    }, error => {
      console.log(error);// Muestra error en consola
    });
  }

}

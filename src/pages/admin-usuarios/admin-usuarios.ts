import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CarritoPage } from '../carrito/carrito';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { TimelinePage } from '../timeline/timeline';
import { ServicioProvider } from '../../providers/servicio/servicio';
/**
 * Generated class for the AdminUsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-usuarios',
  templateUrl: 'admin-usuarios.html',
})
export class AdminUsuariosPage {
  usuarios: any;
  //usuarios: Array<{imagen: string, nombre: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice: LoginservicioProvider, public events: Events, public modalCtrl: ModalController, public servicio: ServicioProvider, public alertCtrl: AlertController) {
    this.cargaUsuarios();
  }

  ionViewDidLoad() {
   
  }

  cargaUsuarios(){
    //Carga los usuarios de la base de datos
   this.servicio.getUsuarios().subscribe(res => {
    let body = res.json();
    this.usuarios = body;
    console.log(body);
  });
  }

  openUsuario(page) {
    this.navCtrl.push(page.component);
  }

  eliminarUsuario(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Eliminacion',
      message: 'Seguro que quiere Eliminar este Usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminacion Cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.servicio.eliminarUsuario(id);
            this.cargaUsuarios();
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher) {
    refresher.complete();
    this.cargaUsuarios();
    console.log('refrescado');
}

logOut(){
  this.loginservice.logout().subscribe(succ => {
    this.navCtrl.setRoot(HomePage);
    this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
  });
}

goToCart() {
  this.navCtrl.setRoot(CarritoPage);
}

goHome() {
   this.navCtrl.setRoot(TimelinePage);
}

}


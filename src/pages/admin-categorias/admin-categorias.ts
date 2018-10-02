import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { AdminCategoriasModalPage } from '../admin-categorias-modal/admin-categorias-modal';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { TimelinePage } from '../timeline/timeline';

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

  categorias: any;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private loginservice: LoginservicioProvider, public modalCtrl: ModalController, public servicio: ServicioProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    //Carga las categorias de la base de datos
    this.servicio.getCategorias().subscribe(res => {
      let body = res.json();
      this.categorias = body;
      console.log(body);
    });
  }

  openCategoria(page) {
    
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  goHome() {
     this.navCtrl.setRoot(TimelinePage);
  }

  openModal() {
    let myModal = this.modalCtrl.create(AdminCategoriasModalPage);

    myModal.onDidDismiss(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });

    myModal.present();
  }

  eliminarCategoria(id) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Eliminacion',
      message: 'Seguro que quiere Eliminar esta Categoria?',
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
            this.servicio.eliminarCategoria(id);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        }
      ]
    });
    alert.present();
  }

  editarCategoria(categoria){

    let myModal = this.modalCtrl.create(AdminCategoriasModalPage, {categoria: categoria});

    myModal.onDidDismiss(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });

    myModal.present();
  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }

}

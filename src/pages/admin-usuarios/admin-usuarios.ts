import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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

  usuarios: Array<{imagen: string, nombre: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.usuarios = [
      { imagen: 'assets/imgs/1.png', nombre: 'Deimon Garcia' },
      { imagen: 'assets/imgs/avatar.jpg', nombre: 'Manuel Perez' }
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsuariosPage');
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}

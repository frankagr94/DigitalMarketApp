import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { ArticulosPage } from '../articulos/articulos';
import { TimelinePage } from '../timeline/timeline';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
  providers: [ ServicioProvider ]
})
export class CategoriasPage {

  categorias: any;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private loginservice: LoginservicioProvider, public servicio: ServicioProvider) {

    this.usuario = loginservice.getUsuarioInfo();
  }

  openCategoria(id) {
    var idcategoria = id;
    this.navCtrl.push(ArticulosPage, {
      data: idcategoria
    });
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
    if(this.loginservice.getUsuarioInfo()==null)
      {this.navCtrl.setRoot(HomePage);}
      else this.navCtrl.setRoot(TimelinePage);
  }

  search() {
  }

  ionViewDidLoad(){
    //Carga las categorias de la base de datos
    this.servicio.getCategorias().subscribe(res => {
      let body = res.json();
      this.categorias = body;
      console.log(body);
    });

  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }
  
}

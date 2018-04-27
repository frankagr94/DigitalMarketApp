import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleArticuloPage } from '../detalle-articulo/detalle-articulo';
import { CarritoPage } from '../carrito/carrito';

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

  articulos: Array<{imagen: string, avatar:string, fecha:string, nombre_usuario:string, nombre: string, precio: string, likes: string, component: any, descripcion: string;}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.articulos = [
      { imagen: 'assets/imgs/articulos/cornetas.png', avatar: 'assets/imgs/avatar.jpg', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Cornetas PC', precio: '1.500.000', likes: '4', component: DetalleArticuloPage, descripcion: 'Cornetas 2w De Potencia. Conector 3.5 Mm Plug Y Se Alimenta De La Corriente De La Pared.' },
      { imagen: 'assets/imgs/articulos/monitor.png', avatar: 'assets/imgs/1.png', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Monitor LCD', precio: '10.500.000', likes: '8', component: DetalleArticuloPage, descripcion: 'Monitores 17" Tipo Lcd, Resolucion Maxima 1280 X 1024 Pixeles (Ciertas Condiciones Aplican), Entrada Vga, 100% Funcionales' },
      { imagen: 'assets/imgs/articulos/equipo.png', avatar: 'assets/imgs/avatar.jpg', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Equipo de Sonido', precio: '20.999.000', likes: '7', component: DetalleArticuloPage, descripcion: 'Hecho Para La Tecnologia Ipod, Potencia Total 100w Rms, Reproduce Cd, Cd-r / W, Mp3, Dos Altavoces De Rango Completo (2 Vias)' },
      { imagen: 'assets/imgs/articulos/pendrive.png', avatar: 'assets/imgs/1.png', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Pendrive Kingston 16gb', precio: '2.488.000', likes: '10', component: DetalleArticuloPage, descripcion: 'Pendrive 16gb Clase 2.0 Color Negro, El Producto No Reproduce Ni Musica Videos Completos' },
      { imagen: 'assets/imgs/articulos/cable.png', avatar: 'assets/imgs/avatar.jpg', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Cable VGA', precio: '300.000', likes: '15', component: DetalleArticuloPage, descripcion: 'Cable Vga Macho a Macho , 1.5 Metros De Largo, Funciona Para Pc, Laptop, Videobeam, Etc' },
      { imagen: 'assets/imgs/articulos/franela.png', avatar: 'assets/imgs/1.png', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Franela Quicksilver', precio: '1.899.000', likes: '9', component: DetalleArticuloPage, descripcion: 'Franela QuickSilver, 100% algodon, importada de USA, Compre con seguridad y asegure su dinero' },
      { imagen: 'assets/imgs/articulos/cocina.png', avatar: 'assets/imgs/avatar.jpg', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Cocina 4 Hornillas', precio: '250.000.000', likes: '6', component: DetalleArticuloPage, descripcion: 'Cocina 20” 4 Hornillas 110V Acero Inoxidable Pruna Viotto Cocina a gas. Calor y luz en un solo lugar. Diseño moderno. Sus funciones y modelo compacto te dan mas de lo que exiges. Parrillas de alto grosor esmaltadas de alta resistencia térmica. Todo en un solo producto.' },
      { imagen: 'assets/imgs/articulos/reloj.png', avatar: 'assets/imgs/1.png', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Reloj Polo Ralph', precio: '1.100.000', likes: '3', component: DetalleArticuloPage, descripcion: 'Reloj Polo Swatch, importado de USA, 100% nuevos y sellados en su caja, oferte con confianza' },
      { imagen: 'assets/imgs/articulos/zapatos.png', avatar: 'assets/imgs/avatar.jpg', fecha: '24 de Abril, 2018', nombre_usuario:'', nombre: 'Zapatos Nike', precio: '3.999.000', likes: '20', component: DetalleArticuloPage, descripcion: 'Zapatos Nike Running 2016, ideales para el deporte de alto desempeño, para actividad al aire libre' },
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  openArticulo(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}

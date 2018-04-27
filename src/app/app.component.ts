import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Importacion de las vistas de la App
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CarritoPage } from '../pages/carrito/carrito';
import { PerfilPage } from '../pages/perfil/perfil';
import { ComprasPage } from '../pages/compras/compras';
import { VentasPage } from '../pages/ventas/ventas';
import { VenderPage } from '../pages/vender/vender';
import { AdminCategoriasPage } from '../pages/admin-categorias/admin-categorias';
import { AdminUsuariosPage } from '../pages/admin-usuarios/admin-usuarios';
import { RegistroPage } from '../pages/registro/registro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string;}>;
  usuario: Array<{title: string, component: any, icon: string;}>;
  admin: Array<{title: string, component: any, icon: string;}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // Arreglo del Menu General
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Quienes Somos', component: AboutPage, icon: 'md-help' },
      { title: 'Login', component: LoginPage, icon: 'md-log-in' },
      { title: 'Registrar', component: RegistroPage, icon: 'md-person-add' },
      { title: 'Categorias', component: ListPage, icon: 'md-pricetags' }
    ];

    // Arreglo del Menu de Usuario Logeado
    this.usuario = [
      { title: 'Vender', component: VenderPage, icon: 'md-cash' },
      { title: 'Mi Perfil', component: PerfilPage, icon: 'md-contact' },
      { title: 'Mis Compras', component: ComprasPage, icon: 'md-basket' },
      { title: 'Mis Ventas', component: VentasPage, icon: 'md-briefcase' },
      { title: 'Mi Carrito', component: CarritoPage, icon: 'md-cart' }
    ];

    this.admin = [
      { title: 'Administrar Categorias', component: AdminCategoriasPage, icon: 'md-list' },
      { title: 'Administrar Usuarios', component: AdminUsuariosPage, icon: 'ios-contacts' }
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //metodo que abre las paginas
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

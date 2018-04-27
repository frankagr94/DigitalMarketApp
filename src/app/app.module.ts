import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PerfilPage } from '../pages/perfil/perfil';
import { ArticulosPage } from '../pages/articulos/articulos';
import { RegistroPage } from '../pages/registro/registro';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { CarritoPage } from '../pages/carrito/carrito';
import { ComprasPage } from '../pages/compras/compras';
import { VentasPage } from '../pages/ventas/ventas';
import { VenderPage } from '../pages/vender/vender';
import { CheckoutPage } from '../pages/checkout/checkout';
import { TimelinePage } from '../pages/timeline/timeline';
import { DetalleArticuloPage } from '../pages/detalle-articulo/detalle-articulo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ArticulosPage,
    RegistroPage,
    PerfilPage,
    CarritoPage,
    LoginPage,
    DetalleArticuloPage,
    AboutPage,
    ComprasPage,
    VentasPage,
    TimelinePage,
    VenderPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ArticulosPage,
    RegistroPage,
    PerfilPage,
    CarritoPage,
    LoginPage,
    DetalleArticuloPage,
    AboutPage,
    ComprasPage,
    VentasPage,
    TimelinePage,
    VenderPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    GoogleAnalytics,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

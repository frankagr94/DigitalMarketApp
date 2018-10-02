import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriasPage } from '../pages/categorias/categorias';
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
import { AdminCategoriasPage } from '../pages/admin-categorias/admin-categorias';
import { AdminUsuariosPage } from '../pages/admin-usuarios/admin-usuarios';
import { DetalleArticuloPage } from '../pages/detalle-articulo/detalle-articulo';
import { AdminCategoriasModalPage } from '../pages/admin-categorias-modal/admin-categorias-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { ServicioProvider } from '../providers/servicio/servicio';
import { LoginservicioProvider } from '../providers/loginservicio/loginservicio';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { IonicImageLoader } from 'ionic-image-loader';
import { File } from '@ionic-native/file';
//import * as  Cloudinary from 'cloudinary-core';
  import * as cloudinary from 'cloudinary-core/cloudinary-core-shrinkwrap';
  import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriasPage,
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
    CheckoutPage,
    AdminCategoriasPage,
    AdminUsuariosPage,
    AdminCategoriasModalPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    CloudinaryModule.forRoot(cloudinary, { cloud_name: 'digitalmarket'}),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriasPage,
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
    CheckoutPage,
    AdminCategoriasPage,
    AdminUsuariosPage,
    AdminCategoriasModalPage,
  ],
  providers: [
    StatusBar,
    GoogleAnalytics,
    SplashScreen,
    ImagePicker,
    Base64,
  File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicioProvider,
    LoginservicioProvider
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading, Events } from 'ionic-angular';
import {FormBuilder, FormGroup,Validators, AbstractControl} from '@angular/forms';
import { CarritoPage } from '../carrito/carrito';
import { TimelinePage } from '../timeline/timeline';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: AbstractControl;
  password: AbstractControl;
  errorMessage: string = null;
  loginForm: FormGroup;
  credenciales: any;

  loading: Loading;
  usuarioActual: any;
  
  constructor(private navCtrl: NavController, private fb: FormBuilder, private loginservice: LoginservicioProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, public events: Events) {
  this.loginForm = fb.group({
    cedula: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
    password: ['', Validators.compose([Validators.maxLength(8), Validators.required])]
  });

  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  registrarse() {
    this.navCtrl.setRoot(RegistroPage);
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  search() {
  }

  public login() {
    this.showLoading()
    let promise = new Promise((resolve, reject) => {
      this.loginservice.encontrarUsuario(this.loginForm.value.cedula).toPromise().then(res => {
        this.usuarioActual = res.json();
        console.log(this.usuarioActual);
        this.loginservice.login(this.usuarioActual, this.loginForm.value.password).subscribe(allowed => {
          if (allowed) {
            console.log(allowed);        
            this.navCtrl.setRoot(TimelinePage);
            this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
            this.presentarMensaje("Bienvenido "+this.loginservice.getUsuarioInfo().nombre);
          } else {
            console.log(allowed);
            this.loading.dismiss();
            this.presentarMensaje("Cedula o Password Incorrectas...");
          }
        },
          error => {
            this.presentarMensaje(error);
          });
      })
    });
  }
 
  presentarMensaje(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 4000,
      position: 'bottom'
    });
  
    toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
 }
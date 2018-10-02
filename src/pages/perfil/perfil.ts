import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { TimelinePage } from '../timeline/timeline';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { Base64 } from '@ionic-native/base64';
import { Observable, Observer } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  form: FormGroup;
  usuario: any;
  usuarioActual: any;
  rutaImagen: any;
  rutaBase64: string;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private base64: Base64, private loadingCtrl: LoadingController, private FormBuilder: FormBuilder, private imagePicker: ImagePicker, public events: Events, private loginservice: LoginservicioProvider, public servicio: ServicioProvider) {
    this.usuario = this.loginservice.getUsuarioInfo()
    this.rutaImagen = { ruta: this.usuario.foto }
    this.crearFormulario();
  }

  crearFormulario(){
    this.form  = this.FormBuilder.group({
     nombre:[this.usuario.nombre, Validators.compose([Validators.maxLength(15), Validators.required])],
     apellido:[this.usuario.apellido, Validators.compose([Validators.maxLength(15), Validators.required])],
     telefono:[this.usuario.telefono, Validators.compose([Validators.maxLength(12), Validators.pattern('[0-9]*'), Validators.required])],
     email:[this.usuario.correo, Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])]
    })   
  }

  guardarImagen(){
    if(this.rutaImagen.ruta != this.usuario.foto){
      this.getBase64ImageFromURL(this.rutaImagen.ruta).subscribe(base64data => {
        this.showLoading('Subiendo Imagen')
        this.rutaBase64 = 'data:image/jpg;base64,' + base64data;
        this.servicio.subirImagen(this.rutaBase64).subscribe(data => {
          var response = data.json();
          let postparams = {
            foto: response.url
          }
          this.servicio.editarUsuario(this.usuario.id, postparams).subscribe(res =>{
            console.log(res.json());
            this.presentarMensaje("Imagen guardada!");
            this.logOut();
          }, error => {
            console.log(error);// Muestra error en consola
          });
         }, error => {
          console.log(error);// Muestra error en consola
        });
      })
    }
    else this.presentAlert('No hay Imagen', 'Por favor selecciona una imagen de tu galeria')
  }

  guardarUsuario(){
    let postparams = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      correo: this.form.value.email
    }
    this.servicio.editarUsuario(this.usuario.id, postparams).subscribe(res =>{
      console.log(res.json());
      this.presentarMensaje("Actualizacion de Datos exitosa!");
      this.logOut();
    }, error => {
      console.log(error);// Muestra error en consola
    });
  }

  presentAlert(titulo, subtitulo) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }

  goHome() {
     this.navCtrl.setRoot(TimelinePage);
  }

  search() {
  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }

  onSelectPhoto() {
    let options = {
      maximumImagesCount: 1,
      quality: 75
    }
    this.imagePicker.getPictures(options)
                    .then((results) => {
                      for (var i = 0; i < results.length; i++) {
                        this.rutaImagen.ruta = results[i];}
                        //convierte la ruta a base64
                      this.base64.encodeFile(this.rutaImagen.ruta).then((base64File: string) => {
                        console.log(base64File);
                        this.rutaBase64 = base64File;
                      }, (err) => {
                        console.log(err);
                      });   
                    }, (err) => { 
                      console.log('error') });                     
  } 

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  showLoading(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  presentarMensaje(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 6000,
      position: 'bottom'
    });
    toast.present();
  }

  doRefresh(refresher) {
    refresher.complete();
    console.log('refrescado');
  }

}

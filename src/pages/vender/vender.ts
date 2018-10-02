import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, Loading, Events, AlertController }from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { LoginservicioProvider } from '../../providers/loginservicio/loginservicio';
import { TimelinePage } from '../timeline/timeline';
import { Base64 } from '@ionic-native/base64';
import { Observable, Observer } from 'rxjs';


/**
 * Generated class for the VenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vender',
  templateUrl: 'vender.html',
})
export class VenderPage {

  form: FormGroup;
  categorias: any;
  fecha: Date;
  rutaImagen: any;
  rutaBase64: string;
  submitAttempt: boolean = false;
  loading: Loading;
  imageResponse: any;

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    private FormBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    public servicio: ServicioProvider,
    private toastCtrl: ToastController,
    private loginservice: LoginservicioProvider,
    public events: Events,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private base64: Base64,
    )
    {
      this.crearFormulario();
      this.fecha = new Date();
      this.rutaImagen = {ruta: ''};
    }

    ionViewDidLoad(){
      //Carga las categorias de la base de datos
      this.servicio.getCategorias().subscribe(res => {
        let body = res.json();
        this.categorias = body;
        console.log(body);
      }); 
    }

    saveData(){
      this.submitAttempt = true;
      if(!this.form.valid){
        console.log("algo pasa!")
      }
      else {
        if(this.rutaImagen != ''){  
          this.submitAttempt = true;

            this.getBase64ImageFromURL(this.rutaImagen.ruta).subscribe(base64data => {
              this.showLoading('Subiendo Imagen')
              this.rutaBase64 = 'data:image/jpg;base64,' + base64data;
              this.servicio.subirImagen(this.rutaBase64).subscribe(data => {
                var response = data.json();
                this.servicio.registrarPublicacion(this.form.value.titulo, this.form.value.descripcion, this.fecha, this.form.value.categoria, this.loginservice.getUsuarioInfo().id, response.url , this.form.value.precio, this.form.value.cantidad)
                console.log(response.url)
                this.presentarMensaje("Publicada Exitosamente!");
                setTimeout(() => {
                  this.navCtrl.setRoot(TimelinePage);
                }, 2000);
               }, error => {
                console.log(error);// Muestra error en consola
              });
            })
        } else this.presentAlert('No hay Imagen', 'Por favor selecciona una imagen de tu galeria')
      }      
    }
    


   crearFormulario(){
      this.form  = this.FormBuilder.group({
       titulo:['', Validators.compose([Validators.maxLength(25), Validators.required])],
       descripcion:['', Validators.compose([Validators.maxLength(255), Validators.required])],
       precio:['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
       categoria:['', Validators.required],
       cantidad:['', Validators.required],
       imagen: ['']
      })
      
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

    presentarMensaje(mensaje) {
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 6000,
        position: 'bottom'
      });
      toast.present();
    }
    

  goToCart() {
    this.navCtrl.push(CarritoPage);
  }
  
  goHome() {
    this.navCtrl.setRoot(TimelinePage);
  }

  logOut(){
    this.loginservice.logout().subscribe(succ => {
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:created', this.loginservice.getUsuarioInfo(), Date.now());
    });
  }

  showLoading(mensaje) {
    this.loading = this.loadingCtrl.create({
      content: mensaje,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  presentAlert(titulo, subtitulo) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['Aceptar']
    });
    alert.present();
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

}

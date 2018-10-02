import { Component } from '@angular/core';
import { NavController, MenuController, Platform, ToastController }from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { ServicioProvider } from '../../providers/servicio/servicio';


/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',

})
export class RegistroPage {
  registrarForm: FormGroup;
  paises: any;
  estados: any;
  ciudades: any;
  submitAttempt: boolean;

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    private FormBuilder: FormBuilder,
    public servicio: ServicioProvider,
    private toastCtrl: ToastController,
    )
    {
      this.submitAttempt = false;
      this.crearFormulario();
    }
    saveData(){
      console.log(this.registrarForm.value);
    }
   crearFormulario(){
      this.registrarForm  = this.FormBuilder.group({
       cedula:['', Validators.compose([Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
       password:['', Validators.compose([Validators.maxLength(8), Validators.required])],
       nombre:['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
       apellido:['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
       email:['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],
       telefono:['', Validators.compose([Validators.maxLength(12), Validators.pattern('[0-9]*'), Validators.required])],
       pais:['', Validators.required],
       estado:['', Validators.required],
       ciudad:['', Validators.required]
      }) 
      
    }

    ionViewDidLoad() {
      //Carga los paises de la base de datos
      this.servicio.getPaises().subscribe(res => {
        let body = res.json();
        this.paises = body;
        console.log(body);
      });
    }

    onSelectPais(event, pais){
      this.servicio.getEstadosDePais(pais.id).subscribe(res => {
        let body = res.json();
        this.estados = body;
        console.log(body);
      });
    }

    onSelectEstado(event, estado){
      this.servicio.getCiudadesDeEstado(estado.id).subscribe(res => {
        let body = res.json();
        this.ciudades = body;
        console.log(body);
      });
    }

    goToCart() {
      this.navCtrl.push(CarritoPage);
    }

    registrar(){
      this.submitAttempt = true;
      if(!this.registrarForm.valid){
        console.log("algo pasa!")
      }
      else {
          this.servicio.registrarUsuario(this.registrarForm.value.cedula, 
                                        this.registrarForm.value.password, 
                                        this.registrarForm.value.nombre, 
                                        this.registrarForm.value.apellido, 
                                        this.registrarForm.value.telefono, 
                                        this.registrarForm.value.email, 
                                        this.registrarForm.value.pais, 
                                        this.registrarForm.value.estado, 
                                        this.registrarForm.value.ciudad).subscribe(res => {

                                          this.presentarMensaje();
                                          console.log("Registrado Exitosamente!")
                                          console.log(this.registrarForm.value);
                                          this.navCtrl.setRoot(HomePage);
                                        });
          
      }
    }

    presentarMensaje() {
      let toast = this.toastCtrl.create({
        message: 'Se ha registrado exitosamente!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }

    goHome() {
      this.navCtrl.setRoot(HomePage);
    }

    search() {
    }
 
  }

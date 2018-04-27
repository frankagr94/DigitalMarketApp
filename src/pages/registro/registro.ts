import { Component } from '@angular/core';
import { NavController, MenuController, Platform }from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';


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
form: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    private FormBuilder: FormBuilder
    )
    {
      this.crearFormulario();
    }
    saveData(){
      console.log(this.form.value);
    }
   crearFormulario(){
      this.form  = this.FormBuilder.group({
       Usuario:['', Validators.required],
       Contraseña:['', Validators.required],
       Nombre:['', Validators.required],
       Apellido:['', Validators.required],
       Cedula:['', Validators.required],
       Correo:['', Validators.required],
       Telefono:['', Validators.required],
       Pais:['', Validators.required],
       Estado:['', Validators.required],
       Ciudad:['', Validators.required]

      })
      
    }

    goToCart() {
      this.navCtrl.setRoot(CarritoPage);
    }

    goHome() {
      this.navCtrl.setRoot(HomePage);
    }

    search() {
    }
 
  }

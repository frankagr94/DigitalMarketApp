import { Component } from '@angular/core';
import { NavController, MenuController, Platform }from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';

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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public platform: Platform,
    private FormBuilder: FormBuilder,
    private imagePicker: ImagePicker
    )
    {
      this.crearFormulario();
    }
    saveData(){
      console.log(this.form.value);
    }
   crearFormulario(){
      this.form  = this.FormBuilder.group({
       Titulo:['', Validators.required],
       Descripcion:['', Validators.required],
       Precio:['', Validators.required],
       Categoria:['', Validators.required]
      })
      
    }
  
    onSelectPhoto() {
      let options = {
        maximumImagesCount: 1,
        width: 100,
        heigth: 100,
        quality: 75
      }
  
      this.imagePicker.getPictures(options)
                      .then((results) => {
                        /*let base64Image = results;*/
                      }, (err) => { 
                        console.log('error') });
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

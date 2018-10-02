import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AdminCategoriasModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-categorias-modal',
  templateUrl: 'admin-categorias-modal.html',
  providers: [ ServicioProvider ]
})
export class AdminCategoriasModalPage {

  categoriaForm: FormGroup;
  submitAttempt: boolean = false;
  categoria: any;

  constructor(public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams, public viewCtrl: ViewController, public servicio: ServicioProvider, private toastCtrl: ToastController) {
    this.categoria = navParams.get('categoria')
    console.log(this.categoria);

    if(this.categoria == null){
      this.categoriaForm = this.fb.group({
        nombre: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        estatus: ['', Validators.required]
      })
    }
    else{
      this.categoriaForm = this.fb.group({
        nombre: [this.categoria.nombre, Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        estatus: [this.booleanToEstatus(this.categoria.estatus), Validators.required]
      })
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCategoriasModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  estatusToBoolean(est){
    if(est == 'true'){
      return true;
    }
    else return false;
  }

  booleanToEstatus(est){
    if(est == true){
      return 'true';
    }
    else return 'false';
  }

  guardarCategoria(){

    this.submitAttempt = true;

 
    if(!this.categoriaForm.valid){
      console.log("algo pasa!")
    }
    else {
      if(this.categoria == null){
        this.servicio.registrarCategoria(this.categoriaForm.value.nombre, this.estatusToBoolean(this.categoriaForm.value.estatus));
      }
      else{
        this.servicio.editarCategoria(this.categoriaForm.value.nombre, this.estatusToBoolean(this.categoriaForm.value.estatus), this.categoria.id);
      }
      this.presentarMensaje();
      this.closeModal();
        console.log("Guardada Exitosamente!")
        console.log(this.categoriaForm.value);
    }

  }

  presentarMensaje() {
    let toast = this.toastCtrl.create({
      message: 'Accion ejecutada exitosamente!',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Accion ejecutada exitosamente!');
    });
  
    toast.present();
  }

}

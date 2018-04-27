import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { CarritoPage } from '../carrito/carrito';
import { TimelinePage } from '../timeline/timeline';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: AbstractControl;
  password: AbstractControl;
  errorMessage: string = null;
  loginForm: FormGroup;
  
  constructor(private navCtrl: NavController, private fb: FormBuilder) {
  this.loginForm = fb.group({
  'username': ['', Validators.compose([Validators.required])],
  'password': ['', Validators.compose([Validators.required])]
  });
  
  this.username = this.loginForm.controls['username'];
  this.password = this.loginForm.controls['password'];
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  openPage() {
    this.navCtrl.setRoot(TimelinePage);
  }
  
 }
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleArticuloPage } from './detalle-articulo';

@NgModule({
  declarations: [
    DetalleArticuloPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleArticuloPage),
  ],
})
export class DetalleArticuloPageModule {}

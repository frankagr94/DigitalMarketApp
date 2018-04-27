import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticulosPage } from './articulos';
import { DetalleArticuloPage } from '../detalle-articulo/detalle-articulo';

@NgModule({
  declarations: [
    ArticulosPage,
    DetalleArticuloPage
  ],
  imports: [
    IonicPageModule.forChild(ArticulosPage),
  ],
})
export class ArticulosPageModule {}

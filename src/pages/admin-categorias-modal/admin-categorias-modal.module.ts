import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCategoriasModalPage } from './admin-categorias-modal';

@NgModule({
  declarations: [
    AdminCategoriasModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCategoriasModalPage),
  ],
})
export class AdminCategoriasModalPageModule {}

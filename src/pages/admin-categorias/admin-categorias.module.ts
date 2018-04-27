import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCategoriasPage } from './admin-categorias';

@NgModule({
  declarations: [
    AdminCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCategoriasPage),
  ],
})
export class AdminCategoriasPageModule {}

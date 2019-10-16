import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]

})
export class HomeModule {}

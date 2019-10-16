import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Customer } from '../models/customer';
import { MenuComponent } from '../menu/menu.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(
    private repository: RepositoryService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  get customer() {
    return this.repository.loggedInCustomer;
  }
  get city_postcode() {
    if (this.customer.city && this.customer.postCode) {
        return this.customer.city + '-' + this.customer.postCode;
    } else if (this.customer.city) {
        return this.customer.city;
    } else if (this.customer.postCode) {
        return this.customer.postCode;
    }
  }
  openMenuModal() {
    this.modalCtrl.getTop().then(res => {
      if (res) {
        this.modalCtrl.dismiss();
      } else {
        this.modalCtrl.create({
          component: MenuComponent
        }).then(el => {
          el.present();
          return el.onDidDismiss();
        });
      }
    });
  }
}

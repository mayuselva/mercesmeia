import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  qrData = null;
  createdCode = null;
  constructor(
    private repository: RepositoryService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.qrData = this.repository.loggedInCustomer.customerAccountNumber;
    this.createdCode = this.qrData;
  }

  next() {
    this.repository.navigate('cards');
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

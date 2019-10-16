import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { environment } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  imgBaseUrl = environment.apiUrl + 'images/';
  currentDate?: string;
  constructor(
    public service: RepositoryService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const d = new Date();
    this.currentDate = (d.getDay() + d.getMonth() + d.getFullYear()).toString();
    if (!this.service.selectedCard) {
        this.service.navigate('cards');
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

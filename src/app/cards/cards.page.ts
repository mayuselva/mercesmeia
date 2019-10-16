import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { LoyaltyCard } from '../models/loyaltyCard';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  imgBaseUrl = environment.apiUrl + 'images/';
  currentDate?: Date;
  constructor(
    public service: RepositoryService,
    private loading: LoadingController,
    private alert: AlertService,
    private modalCtrl: ModalController
  ) { }

    ngOnInit() {
      this.currentDate = new Date();
      this.getCards();
    }
    getCards() {
      this.loading
        .create({ keyboardClose: true, message: 'Loading...'})
        .then(loadingEl => {
            loadingEl.present();

            this.service.getCards(this.service.loggedInCustomer.customerAccountNumber)
              .subscribe((response: LoyaltyCard[]) => {
              loadingEl.dismiss();
              this.service.cards = response;
            }, errorRes => {
              loadingEl.dismiss();
              this.alert.showErrorAlert('An error occurred!', errorRes.statusText);
            });

        });
    }
    selectCard(card?: LoyaltyCard) {
      this.service.selectedCard = Object.assign({}, card);
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

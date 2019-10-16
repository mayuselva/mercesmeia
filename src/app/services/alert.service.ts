import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RepositoryService } from './repository.service';

@Injectable()
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private repository: RepositoryService
  ) { }

  showErrorAlert(heading: string, msg: string, redirectUrl?: string) {
    this.alertCtrl
      .create({
        header: heading,
        message: msg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              if (redirectUrl) {
                this.repository.navigate(redirectUrl);
              }
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });

  }
  showExitAlert() {
    this.alertCtrl.create({
      header: 'Exit',
      message: 'Do you want to exit?',
      cssClass: 'alertDanger',
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'alert-danger'
      }, {
        text: 'exit',
        cssClass: 'alert-secondary',
        handler: () => {
          (navigator as any).app.exitApp();
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}

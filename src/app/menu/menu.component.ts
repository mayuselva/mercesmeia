import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    public repository: RepositoryService
    ) { }

  ngOnInit() {}
  logout() {
    this.authService.logout();
    this.modalCtrl.dismiss('', 'cancel');
  }
  get name() {
    if (this.repository.loggedInCustomer) {
      if (this.repository.loggedInCustomer.lastName) {
          return this.repository.loggedInCustomer.firstName + ' ' + this.repository.loggedInCustomer.lastName;
      } else {
        return this.repository.loggedInCustomer.firstName;
      }
    }
  }
  closeModal() {
    this.modalCtrl.dismiss('', 'cancel');
  }
  goPage(url: string) {
    this.repository.navigate(url);
    this.closeModal();
  }
}

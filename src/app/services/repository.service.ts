import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { LoyaltyCard } from '../models/loyaltyCard';
import { NavController, ModalController } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';

@Injectable()
export class RepositoryService {
  baseUrl = environment.apiUrl;
  loggedInCustomer?: Customer;
  cards?: LoyaltyCard[];
  selectedCard?: LoyaltyCard;
  url?: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private nav: NavController,
    private modalCtrl: ModalController
  ) {
    this.cards = [];
   }

  getUser(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + 'customers/getcustomer/' + username );
  }
  getCards(customerno: string): Observable<LoyaltyCard[]> {
    return this.http.get<LoyaltyCard[]>(this.baseUrl + 'ionics/getcards/' + customerno );
  }
  navigate(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (tag === 'home') {
      this.nav.navigateRoot('/home');
    } else if (tag === 'login') {
      this.nav.navigateRoot('/login');
    } else if (tag === 'cards') {
      this.nav.navigateRoot('/home/cards');
    } else if (tag === 'my-profile') {
      this.nav.navigateRoot('/home/my-profile');
    }
  }
  getRoute() {
    this.url = location.pathname;
    const root = this.url.split('/');
    const len = root.length;
    if (len > 2) {
      return root[len - 2];
    } else {
      return 'exit';
    }
  }
}

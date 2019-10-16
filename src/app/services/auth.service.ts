import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import { RepositoryService } from './repository.service';
import { Storage } from '@ionic/storage';
import { from, BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private repository: RepositoryService,
    private storage: Storage,
    private plt: Platform
    ) {
      this.checkToken();
     }


  login(model: any) {
    return this.http.post(this.baseUrl + 'customer/login', model)
      .pipe(
        map((response: any ) => {
          const user = response;
          if (user) {
            this.storage.set('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.authenticationState.next(true);
          }
        })
      );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  checkToken() {
    this.storage.get('token').then((token) => {
      if (token) {
        const auth = !this.jwtHelper.isTokenExpired(token);
        this.decodedToken = this.jwtHelper.decodeToken(token);
        if (auth) {
          this.authenticationState.next(true);
        } else {
          this.storage.remove('token');
        }
      }
    });
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
  logout() {
    this.storage.remove('token').then(() => {
      this.authenticationState.next(false);
      this.repository.navigate('login');
    });
  }
}

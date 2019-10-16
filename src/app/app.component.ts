import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Spinkit } from 'ng-http-loader';
import { RepositoryService } from './services/repository.service';
import { Storage } from '@ionic/storage';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  public spinkit = Spinkit;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public repository: RepositoryService,
    private modalCtrl: ModalController,
    private alert: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    // this.storage.get('token').then((token) => {
    //   if (token) {
    //     this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    //   }
    // });

    this.authService.authenticationState.subscribe(state => {
      if (state) {
          this.repository.navigate('home');
      } else {
        this.repository.navigate('home');
      }
    });

    this.platform.backButton.subscribe(() => {
      // if menu open close
      this.modalCtrl.dismiss();
      // back url
      const url = this.repository.getRoute();
      if (url !== 'exit') {
        this.repository.navigate(url);
      } else {
         this.alert.showExitAlert();
      }
    });
  }
}

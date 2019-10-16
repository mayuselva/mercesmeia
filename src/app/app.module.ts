import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RepositoryService } from './services/repository.service';
import { AuthCustomerResolver } from './resolver/auth-customer.resolver';
import { BaseComponent } from './base/base.component';
import { AlertService } from './services/alert.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ErrorInterceptor } from './services/error.interceptor';

// export function tokenGetter() {
//   const token = localStorage.getItem('token');
//   if (this.jwtHelper.isTokenExpired(token)) {
//     const url = location.pathname;
//     if (!url.endsWith('login')) {
//        location.reload();
//     }
//   }
//   return token;
// }
export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => {
      return storage.get('token').then((val) => {
        return val;
      });
    },
    whitelistedDomains: ['portal.mercesmeia.com'],
    blacklistedRoutes: ['portal.mercesmeia.com/api/auth']
  };
}
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  entryComponents: [],
  imports:
  [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    // CoreModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    AuthService,
    RepositoryService,
    AlertService,
    AuthCustomerResolver,
    ErrorInterceptor,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

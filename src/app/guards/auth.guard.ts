import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { delay } from 'q';
import { RepositoryService } from '../services/repository.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private alert: AlertService,
      private repository: RepositoryService
    ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.repository.navigate('login');
    // this.alert.showErrorAlert('Authentication Failed', 'Please Login...', 'login');
    return false;
  }
}

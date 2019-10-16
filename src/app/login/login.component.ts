import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RepositoryService } from '../services/repository.service';
import { AlertService } from '../services/alert.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  model: any = {};
  constructor(
    private authService: AuthService,
    private repository: RepositoryService,
    private alert: AlertService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    this.model.username = f.value.email;
    this.model.password = f.value.password;

    this.loading
      .create({ keyboardClose: true, message: 'Loading...'})
      .then(loadingEl => {
          loadingEl.present();

          this.authService.login(this.model).subscribe(data => {
            loadingEl.dismiss();
            this.repository.navigate('home');
          }, errorRes => {
            loadingEl.dismiss();
            this.alert.showErrorAlert('Login', errorRes.statusText);
          });

      });
  }
}

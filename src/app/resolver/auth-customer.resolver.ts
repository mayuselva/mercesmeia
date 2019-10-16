import {Injectable} from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { RepositoryService } from '../services/repository.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';


@Injectable()

export class AuthCustomerResolver implements Resolve<Customer> {

    constructor(
        private repositoryService: RepositoryService,
        private authService: AuthService,
        private alert: AlertService
    ) {}

    resolve(): Observable<Customer> {
        if (this.repositoryService.loggedInCustomer &&
            (this.repositoryService.loggedInCustomer.email.toLowerCase() === this.authService.decodedToken.nameid.toLowerCase())) {
                return Observable.create(observer => {
                    observer.next(this.repositoryService.loggedInCustomer);
                    observer.complete();
                });
        } else {
            return this.repositoryService.getUser(this.authService.decodedToken.nameid).pipe(
                catchError(error => {
                    this.alert.showErrorAlert('Problem in retrieving data', error, 'login');
                    return of(null);
                })
            );
        }
    }
}

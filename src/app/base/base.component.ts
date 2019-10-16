import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public repository: RepositoryService
  ) { }

  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    this.route.data.subscribe(data => {
      this.repository.loggedInCustomer = data.authCustomer;
    });
  }
}

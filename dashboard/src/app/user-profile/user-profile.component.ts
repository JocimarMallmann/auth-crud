import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../dashboards/users';
import { UsersService } from '../dashboards/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User
  subscription: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.searchByName(params.userName);
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchByName(name: string) {
    this.usersService.filterName(name)
      .subscribe(
        (user) => {
          console.log(user);
          this.user = user;
        },
        (err) => console.log(err)
      );
  }

}

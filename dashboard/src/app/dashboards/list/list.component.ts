import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Users, User } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() users: Users;
  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.usersService.listUsers()
      .subscribe(
        (users) => {
          console.log(users);
          this.users = users;
        },
        (err) => {
          console.log('erro');
          console.log(err);
        }
      )
  }

  update(id: number) {
    this.router.navigate(['dashboards/user', id]);
  }

  delete(id: number) {
    console.log(id);
    // this.usersService.delete(id);
  }

}

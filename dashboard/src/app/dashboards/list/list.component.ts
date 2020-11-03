import { Component, Input, OnInit } from '@angular/core';

import { Users } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() users: Users;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    // Próximo passo, interceptar o http request mandando o token junto
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

}

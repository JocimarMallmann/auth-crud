import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
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
    private userService: UserService,
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

  // O update será efetivamente feito no componente user-form.component
  update(id: number) {
    this.router.navigate(['dashboards/user', id]);
  }

  delete(id: number) {
    this.usersService.delete(id)
      .pipe(
        switchMap(() => this.usersService.listUsers())
      )
      .subscribe(
        (users) => {
          this.users = users;
        },
        (err) => console.log(err)
      );
    // Se o usuário se auto deletar
    if(this.userService.getUserId() === id) {
      this.userService.logout();
      this.router.navigate(['']);
    }
  }

}

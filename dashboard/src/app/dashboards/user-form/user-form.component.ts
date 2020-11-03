import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  subscription: Subscription
  idUser: number;

  // user: User;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {


    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.idUser = params.id;
      },
      (err) => console.log(err)
    );
    // this.searchById(this.idUser);

    this.editForm = this.formBuilder.group({
      nome: ['',
        [ Validators.required ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // searchById(id: number) {
  //   this.usersService.searchById(id).subscribe(
  //     (user) => {
  //       console.log('No searchById ', user);
  //       this.user = user;
  //     },
  //     (err) => console.log(err)
  //   )
  // }
  send() {
    const values = this.editForm.getRawValue();
    console.log('values ', values);

    this.usersService
      .update(this.idUser, values)
      .subscribe(
        (res) => {
          console.log('res ', res);
        },
        (err) => {
          console.log(err);
        }
      )
  }

}

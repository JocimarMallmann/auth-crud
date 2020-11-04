import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from '../users';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      name: ['',
        [ Validators.required ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [ Validators.required ]
      ]
    })
  }

  send() {

    const user = this.createUserForm.getRawValue();

    let newUser: NewUser = {
      nome: user.name,
      email: user.email,
      senhaHash: user.password,
    }
    if(this.createUserForm.valid) {
      this.usersService.add(newUser).subscribe(
        (res) => {
          console.log('dados enviados com sucesso');
          this.createUserForm.reset();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

}

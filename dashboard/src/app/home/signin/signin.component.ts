import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { Authentication } from './authentication';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [ Validators.required ]
      ]
    });

  }

  login() {
    const newAuth = this.loginForm.getRawValue() as Authentication;
    console.log(newAuth);

    this.authService
      .authenticate(newAuth.email, newAuth.password)
      .subscribe(
        (res) => {
          console.log('autenticado');
          this.router.navigate(['dashboards']);
        },
        (err) => {
          this.loginForm.reset();
          this.focusEmailInput();

          alert('E-mail ou senha inválidos');
          console.log(err);
        }
      );
  }

  focusEmailInput() {
    if(this.platformDetectorService.isPlatformBrowser()) {
      // caso o código rode no server-side, este código que acessa o DOM não executaria.
      this.emailInput.nativeElement.focus();
    }
  }

}

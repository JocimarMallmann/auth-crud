import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from '../token/token.service';
import { User } from './user';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBehaviorSubject = new BehaviorSubject<User>(null);
  private userName: string;
  private userId: number;

  constructor(private tokenService: TokenService) {
    // caso feche o navegador e abra de novo, se tiver token, decodifica o payload e traz as informações do usuário
    if(this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User> {
    return this.userBehaviorSubject.asObservable();
  }

  getUserName(): string {
    return this.userName;
  }
  getUserId(): number {
    return this.userId;
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userBehaviorSubject.next(null);
  }

  // Decodifica o payload
  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.userBehaviorSubject.next(user);
    this.userName = user.user;
    this.userId = user.id;
  }

}

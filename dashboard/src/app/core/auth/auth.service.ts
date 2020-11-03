import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { UserService } from '../user/user.service';

const API = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(email, password): Observable<any> {
    return this.http.post(
      API + '/login',
      { email: email, password: password },
      { observe: 'response' }
    ).pipe(
      tap((res: HttpResponse<any>) => {
        const token = res.headers.get('authorization');
        // console.log(token);
        // console.log('headers recebido api, ', res.headers);
        this.userService.setToken(token);
      })
    );
  }

}

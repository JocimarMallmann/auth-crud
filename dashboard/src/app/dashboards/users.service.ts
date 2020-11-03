import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Users, User } from './users';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<Users> {
    return this.http.get<Users>(API + '/users');
  }

  searchById(id: number): Observable<User> {
    return this.http.get<User>(API + '/user/' + id);
  }

  update(id: number, values) {
    console.log('update service');
    return this.http.patch(API + '/user/' + id, { values });
  }

  delete(id: number) {
    return this.http.delete(API + '/user/' + id);
  }

}

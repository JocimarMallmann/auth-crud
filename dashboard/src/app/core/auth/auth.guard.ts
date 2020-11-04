import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
/**
 * Um Guard específico para rotas que necessitam estar logado.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Ativou guarda de rotas');

    if(!this.userService.isLogged()) {
      // Se não está logado, vai ser jogado para tela de login
      this.router.navigate(['']);

      return false;
    }
    return true;
  }

}

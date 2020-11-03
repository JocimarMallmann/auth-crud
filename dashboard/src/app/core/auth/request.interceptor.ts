import { HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  constructor(
    private tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
    HttpSentEvent | HttpEvent<any> | HttpHeaderResponse | HttpResponse<any> | HttpUserEvent<any>> {

    if(this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();

      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    console.log('req enviada ', req);
    return next.handle(req);
  }

}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../services/account.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.tokenService.getToken();
    const isLoggedIn = user;
    const isApiUrl = request.url.startsWith(environment.API);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user}`,
        },
      });
    }

    return next.handle(request);
  }
}

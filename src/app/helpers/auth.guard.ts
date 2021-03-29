import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Router,
  Route,
} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GQL_CHECK } from '../graphql/graphql';
import { GraphQlService } from '../services/graphql.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  resultado: boolean = true;
  constructor(
    private router: Router,
    private apollo: Apollo,
    private gqlService: GraphQlService,
    private tokenService: TokenService,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;
    return await this.checkLogin(url);
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return await this.canActivate(route, state);
  }

  async canLoad(route: Route): Promise<boolean> {
    const url = `/${route.path}`;
    return await this.checkLogin(url);
  }

  async checkLogin(url: string): Promise<boolean> {
    await this.check();
    const token = this.tokenService.getToken();
    console.log(this.resultado);
    if (token && this.resultado) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.gqlService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = Math.random();

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor',
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }

  private async check() {
    this.apollo
      .query({
        query: GQL_CHECK,
        fetchPolicy: 'network-only',
      })
      .subscribe(
        ({ data }) => {
          if (data) {
            this.resultado = true;
          }
        },
        (err: any) => {
          console.log('check err: ', err);
          this.tokenService.signOut();
          this.resultado = false;
        },
      );
  }
}

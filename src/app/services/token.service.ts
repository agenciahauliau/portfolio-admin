import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { GQL_CHECK } from '../graphql/graphql';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private apollo: Apollo) {}

  signOut(): void {
    this.apollo.client.resetStore();
    window.localStorage.removeItem(environment.TOKEN_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(environment.TOKEN_KEY);
    window.localStorage.setItem(environment.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(environment.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(environment.USER_KEY);
    window.localStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(environment.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}

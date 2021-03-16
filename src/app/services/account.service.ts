import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { TokenService } from '../helpers/token.service';
import { GQL_BUSCAR_IMOVEL, GQL_LOGIN, GQL_ME } from '../helpers/graphql';
import { Imovel } from '../helpers/types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  perfil: unknown;

  constructor(
    private apollo: Apollo,
    private tokenStorage: TokenService,
    private router: Router
  ) {}

  async login(email: string, senha: string) {
    return this.apollo
      .mutate({
        mutation: GQL_LOGIN,
        variables: {
          email: email,
          senha: senha,
        },
        errorPolicy: 'all',
      })
      .subscribe(
        ({ data }: any) => {
          this.tokenStorage.saveToken(data.login);
          //this.tokenStorage.saveUser(data.user);
          console.log('got data', data.login);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  async me() {
    return this.apollo
      .query({
        query: GQL_ME,
        errorPolicy: 'all',
      })
      .subscribe(
        (data) => {
          if (data.errors) {
            console.log(data.errors);
            return data.errors;
          } else {
            console.log(data);
            return (this.perfil = data);
          }
        },
        (err) => {
          console.log(err);
          err;
        }
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

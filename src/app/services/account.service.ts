import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { TokenService } from '../helpers/token.service';
import {
  GQL_CRIAR_IMOVEL,
  GQL_CRIA_GALERIA,
  GQL_DELETA_GALERIA,
  GQL_LOGIN,
  GQL_ME,
  GQL_REMOVE_IMOVEL,
} from '../helpers/graphql';
import { Galeria, Imovel, User } from '../helpers/types';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  perfil: unknown;

  constructor(
    private apollo: Apollo,
    private tokenStorage: TokenService,
    private router: Router,
  ) {}

  async login(dados: User) {
    return this.apollo
      .mutate({
        mutation: GQL_LOGIN,
        variables: dados,
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
        },
      );
  }

  async criarImovel(dados: Imovel) {
    return this.apollo
      .mutate({
        mutation: GQL_CRIAR_IMOVEL,
        variables: dados,
        errorPolicy: 'all',
      })
      .subscribe(
        ({ data }: any) => {
          if (data.errors) {
            console.log('Erro ao criar', data.errors);
            return data.errors;
          } else {
            console.log('Imóvel criado', data.imovel);
            return data.imovel;
          }
        },
        (error) => {
          console.log('erro', error);
        },
      );
  }

  async criarGaleria(dados: Galeria) {
    return this.apollo
      .mutate({
        mutation: GQL_CRIA_GALERIA,
        variables: dados,
        errorPolicy: 'all',
      })
      .subscribe(
        ({ data }: any) => {
          if (data.errors) {
            console.log('Erro ao criar galeria', data.errors);
            return data.errors;
          } else {
            console.log('Galeria criada', data.imovel);
            return data.imovel;
          }
        },
        (error) => {
          console.log('erro', error);
        },
      );
  }

  async removeGaleria(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_GALERIA,
        variables: { _id: id },
        errorPolicy: 'all',
      })
      .subscribe(
        ({ data }: any) => {
          if (data.errors) {
            console.log('Erro ao deletar', data.errors);
            return data.errors;
          } else {
            console.log('Galeria removido', data.galeria);
            return data.galeria;
          }
        },
        (error) => {
          console.log('erro', error);
        },
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
        },
      );
  }

  async deletar(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_REMOVE_IMOVEL,
        variables: { _id: id },
        errorPolicy: 'all',
      })
      .subscribe(
        ({ data }: any) => {
          if (data.errors) {
            console.log('Erro ao deletar', data.errors);
            return data.errors;
          } else {
            console.log('Imóvel removido', data.imovel);
            return data.imovel;
          }
        },
        (error) => {
          console.log('erro', error);
        },
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

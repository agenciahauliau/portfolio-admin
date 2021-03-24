import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { TokenService } from './token.service';
import { GQL_CRIAR_IMOVEL, GQL_LOGIN, GQL_ME, GQL_REMOVE_IMOVEL } from '../graphql/graphql';
import { Imovel, User } from '../helpers/types';
@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
  perfil: unknown;
  redirectUrl: string = '';

  constructor(private apollo: Apollo, private tokenStorage: TokenService, private router: Router) {}

  async login(dados: User) {
    return this.apollo
      .mutate({
        mutation: GQL_LOGIN,
        variables: dados,
      })
      .subscribe(
        ({ data, errors }: any) => {
          let resultado;
          if (data) {
            console.log('Autenticado');
            this.tokenStorage.saveToken(data.login);
            resultado = true;
          }
          if (errors) {
            console.error(errors[0].message);
            resultado = false;
          }
          console.log('resultado', resultado);
          return resultado;
        },
        (err) => {
          console.error('Erro: ', err);
        },
      );
  }

  async criarImovel(dados: Imovel) {
    return this.apollo
      .mutate({
        mutation: GQL_CRIAR_IMOVEL,
        variables: dados,
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao criar imóvel:', errors[0].message);
          }
          if (data) {
            return console.log('Imovel criado', data);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  async me() {
    return this.apollo
      .query({
        query: GQL_ME,
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Error me: ', errors[0].message);
          }
          if (data) {
            return console.log('Data me: ', data);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  async deletar(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_REMOVE_IMOVEL,
        variables: { _id: id },
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao deletar: ', errors[0].message);
          }
          if (data) {
            return console.log('Deletado', data.removeImovel);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

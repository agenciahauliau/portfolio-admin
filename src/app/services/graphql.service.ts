import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { TokenService } from './token.service';
import {
  GQL_CRIAR_IMOVEL,
  GQL_ATUALIZA_IMOVEL,
  GQL_DELETA_IMOVEL,
  GQL_CRIA_GALERIA,
  GQL_DELETA_GALERIA,
  GQL_ATUALIZA_GALERIA,
  GQL_LOGIN,
  GQL_ME,
} from '../graphql/graphql';
import { Galeria, Imovel, User } from '../helpers/types';
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

  async atualizaImovel(id: any, dados: Imovel) {
    return this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_IMOVEL,
        variables: {
          _id: id,
          dados: dados,
        },
        errorPolicy: 'all',
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao atualizar imóvel:', errors[0].message);
          }
          if (data) {
            return console.log('Imovel atualizado', data);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  async deletarImovel(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_IMOVEL,
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

  async atualizaGaleria(id: any, dados: Galeria) {
    return this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_GALERIA,
        variables: {
          id: id,
          dados: dados,
        },
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao atualizar galeria:', errors[0].message);
          }
          if (data) {
            return console.log('Galeria atualizada', data);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  async removeGaleria(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_GALERIA,
        variables: { id: id },
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

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

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
  GQL_LISTAR_IMOVEIS,
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
    const result = this.apollo
      .mutate({
        mutation: GQL_LOGIN,
        variables: dados,
      })
      .toPromise();
    return result;
  }

  async criarImovel(dados: Imovel) {
    const result = this.apollo
      .mutate({
        mutation: GQL_CRIAR_IMOVEL,
        refetchQueries: [{ query: GQL_LISTAR_IMOVEIS }],
        variables: dados,
      })
      .toPromise();
    return result;
  }

  async atualizaImovel(id: any, dados: Imovel) {
    const result = this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_IMOVEL,
        refetchQueries: [{ query: GQL_LISTAR_IMOVEIS }],
        variables: {
          _id: id,
          ...dados,
        },
      })
      .toPromise();
    return result;
  }

  async deletarImovel(id: string) {
    console.log(id);
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_IMOVEL,
        refetchQueries: [{ query: GQL_LISTAR_IMOVEIS }],
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
    const result = this.apollo
      .mutate({
        mutation: GQL_CRIA_GALERIA,
        variables: dados,
        errorPolicy: 'all',
      })
      .toPromise();
    return result;
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

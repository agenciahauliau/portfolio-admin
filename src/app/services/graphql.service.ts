import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { TokenService } from './token.service';
import {
  GQL_LOGIN,
  GQL_ME,
  GQL_CRIAR_IMOVEL,
  GQL_ATUALIZA_IMOVEL,
  GQL_DELETA_IMOVEL,
  GQL_LISTAR_IMOVEIS,
  GQL_CRIAR_LEAD,
  GQL_LISTAR_LEADS,
  GQL_ATUALIZA_LEAD,
  GQL_DELETA_LEAD,
  GQL_CRIAR_POST,
  GQL_LISTAR_POSTS,
  GQL_ATUALIZA_POST,
  GQL_DELETA_POST,
  GQL_ATUALIZA_FILE,
  GQL_LISTAR_FILES,
} from '../graphql/graphql';
import { File, Imovel, Lead, Post, User } from '../helpers/types';
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
        variables: { input: dados },
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
          input: {
            ...dados,
          },
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

  async criarLead(dados: Lead) {
    const result = this.apollo
      .mutate({
        mutation: GQL_CRIAR_LEAD,
        refetchQueries: [{ query: GQL_LISTAR_LEADS }],
        variables: { input: dados },
      })
      .toPromise();
    return result;
  }

  async atualizaLead(id: any, dados: Lead) {
    const result = this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_LEAD,
        refetchQueries: [{ query: GQL_LISTAR_LEADS }],
        variables: {
          _id: id,
          input: {
            ...dados,
          },
        },
      })
      .toPromise();
    return result;
  }

  async deletarLead(id: string) {
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_LEAD,
        refetchQueries: [{ query: GQL_LISTAR_LEADS }],
        variables: { id: id },
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao deletar: ', errors[0].message);
          }
          if (data) {
            return console.log('Deletado', data.removeLead);
          }
        },
        (err) => {
          console.error('Err: ', err);
        },
      );
  }

  async criarPost(dados: Post) {
    const result = this.apollo
      .mutate({
        mutation: GQL_CRIAR_POST,
        refetchQueries: [{ query: GQL_LISTAR_POSTS }],
        variables: { input: dados },
      })
      .toPromise();
    return result;
  }

  async atualizaPost(id: any, dados: Post) {
    const result = this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_POST,
        refetchQueries: [{ query: GQL_LISTAR_POSTS }],
        variables: {
          id: id,
          input: {
            ...dados,
          },
        },
      })
      .toPromise();
    return result;
  }

  async deletarPost(id: string) {
    return this.apollo
      .mutate({
        mutation: GQL_DELETA_POST,
        refetchQueries: [{ query: GQL_LISTAR_POSTS }],
        variables: { id: id },
      })
      .subscribe(
        ({ errors, data }: any) => {
          if (errors) {
            return console.error('Erro ao deletar: ', errors[0].message);
          }
          if (data) {
            return console.log('Deletado', data.removeLead);
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

  async atualizaFile(id: any, dados: File) {
    const result = this.apollo
      .mutate({
        mutation: GQL_ATUALIZA_FILE,
        refetchQueries: [{ query: GQL_LISTAR_FILES }],
        variables: {
          _id: id,
          input: {
            ...dados,
          },
        },
      })
      .toPromise();
    return result;
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';

const uri = environment.API;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = sessionStorage.getItem('auth-token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          imoveis: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          galerias: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

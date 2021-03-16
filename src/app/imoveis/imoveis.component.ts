import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_IMOVEIS } from '../services/graphql';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.scss'],
})
export class ImoveisComponent implements OnInit, OnDestroy {
  imoveis!: any[];
  imoveisQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.imoveisQuery = this.apollo.watchQuery<any>({
      query: GQL_IMOVEIS,
      pollInterval: 500,
    });

    this.querySubs = this.imoveisQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.imoveis = data.imoveis;
      }
    );
  }

  refresh() {
    this.imoveisQuery.refetch();
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}

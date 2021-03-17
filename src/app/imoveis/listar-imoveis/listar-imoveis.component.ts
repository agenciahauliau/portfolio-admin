import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { GQL_IMOVEIS, GQL_REMOVE_IMOVEL } from '../../helpers/graphql';
import { Imovel } from '../../helpers/types';

@Component({
  selector: 'app-listar-imoveis',
  templateUrl: './listar-imoveis.component.html',
  styleUrls: ['./listar-imoveis.component.scss'],
})
export class ListarImoveisComponent implements OnInit, OnDestroy {
  imoveis!: Imovel[];
  imoveisQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private router: Router,
    private accountService: AccountService
  ) {}

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

  goToImovel(imovelId: any) {
    this.router.navigate(['/imovel', imovelId]);
  }

  refresh() {
    this.imoveisQuery.refetch();
  }

  async remover(id: any) {
    await this.accountService.deletar(id);
    this.refresh();
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}

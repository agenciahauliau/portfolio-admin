import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GraphQlService } from '../../services/graphql.service';
// import { GQL_CONFIGURACOES } from '../../graphql/graphql';
import { configuracao } from '../../helpers/types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss', '../assets/admin.component.scss'],
})
export class Informacao implements OnInit, OnDestroy {
  configuracoes!: configuracao[];
  configuracoesQuery!: QueryRef<any>;
  loading = true;
  error: any;

  p: number = 1;

  private querySubs = new Subscription();

  iconeEditar!: SafeHtml;
  iconeExcluir!: SafeHtml;

  constructor(
    private apollo: Apollo,
    private gqlService: GraphQlService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.iconeEditar = this.sanitizer.bypassSecurityTrustHtml(icones.iconeEditar);
    this.iconeExcluir = this.sanitizer.bypassSecurityTrustHtml(icones.iconeExcluir);

    // this.configuracoesQuery = this.apollo.watchQuery<any>({
    //   query: GQL_CONFIGURACOES,
    // });

    this.querySubs = this.configuracoesQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.configuracoes = [...data.configuracoes];
    });
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}

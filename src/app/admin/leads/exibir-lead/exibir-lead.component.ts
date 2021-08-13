import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCA_UNICO_LEAD } from '../../../graphql/graphql';
import { Lead } from '../../../helpers/types';

@Component({
  selector: 'app-exibir-lead',
  templateUrl: './exibir-lead.component.html',
  styleUrls: ['./exibir-lead.component.scss', '../../assets/admin.component.scss'],
})

export class ExibirLeadComponent implements OnInit, OnDestroy {

  public phone = 1245865453333333
  
  public lead!: Lead;
  private leadQuery!: QueryRef<any>;
  public loading = true;
  public error: any;

  private querySubs = new Subscription();
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const leadId = this.route.snapshot.paramMap.get('id');
    this.leadQuery = this.apollo.watchQuery<Lead>({
      query: GQL_BUSCA_UNICO_LEAD,
      variables: {
        _id: leadId,
      },
      errorPolicy: 'all',
    });
    
    this.querySubs = this.leadQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.lead = data.lead;
    });
  }

  refresh() {
    this.leadQuery.refetch();
  }

  editarImovel(leadId: any) {
    this.router.navigate(['admin/editar-imovel', leadId]);
  }

  voltar() {
    this.router.navigate(['admin/imoveis']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }
}

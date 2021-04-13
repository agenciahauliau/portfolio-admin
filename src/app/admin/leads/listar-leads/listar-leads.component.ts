import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEye, faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { GraphQlService } from '../../../services/graphql.service';
import { GQL_LISTAR_LEADS } from '../../../graphql/graphql';
import { Lead } from '../../../helpers/types';

@Component({
  selector: 'app-listar-leads',
  templateUrl: './listar-leads.component.html',
  styleUrls: ['./listar-leads.component.scss', '../../admin.component.scss'],
})
export class ListarLeadsComponent implements OnInit, OnDestroy {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faImage = faImage;
  faPlusSquare = faPlusSquare;

  leads!: Lead[];
  leadsQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(private apollo: Apollo, private router: Router, private gqlService: GraphQlService) {}

  ngOnInit() {
    this.leadsQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_LEADS,
      nextFetchPolicy: 'cache-and-network',
    });

    this.querySubs = this.leadsQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.leads = data.leads;
    });
  }

  goToLead(leadId: any) {
    this.router.navigate(['admin/lead', leadId]);
  }

  editarLead(leadId: any) {
    this.router.navigate(['admin/editar-lead', leadId]);
  }

  refresh() {
    this.leadsQuery.refetch();
  }

  async remover(id: any) {
    await this.gqlService.deletarImovel(id);
    this.refresh();
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}

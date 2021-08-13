import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEye, faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { GraphQlService } from '../../../services/graphql.service';
import { GQL_LISTAR_LEADS } from '../../../graphql/graphql';
import { Lead } from '../../../helpers/types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

@Component({
  selector: 'app-listar-leads',
  templateUrl: './listar-leads.component.html',
  styleUrls: ['../../assets/lista-itens.component.scss', '../../assets/admin.component.scss'],
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

  p: number = 1;

  private querySubs = new Subscription();

  iconeEditar!: SafeHtml;
  iconeExcluir!: SafeHtml;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private gqlService: GraphQlService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.iconeEditar = this.sanitizer.bypassSecurityTrustHtml(icones.iconeEditar);
    this.iconeExcluir = this.sanitizer.bypassSecurityTrustHtml(icones.iconeExcluir);

    this.leadsQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_LEADS,
    });

    this.querySubs = this.leadsQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.leads = [...data.leads];
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
    if (confirm(`Têm certeza que quer deletar?`)) {
      await this.gqlService.deletarLead(id);
      this.refresh();
    } else {
      this.refresh();
    }
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}

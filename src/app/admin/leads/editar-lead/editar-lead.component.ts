import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_UNICO_LEAD } from '../../../graphql/graphql';

@Component({
  selector: 'app-editar-lead',
  templateUrl: './editar-lead.component.html',
  styleUrls: [
    './editar-lead.component.scss',
    '../../assets/form.component.scss',
    '../../assets/admin.component.scss',
  ],
})
export class EditarLeadComponent implements OnInit, OnDestroy {
  public leadForm!: Lead & FormGroup;
  private leadQuery!: QueryRef<any>;
  private querySubs = new Subscription();
  public loading: boolean = true;
  public error: any;
  public urlCaminho: any = '';
  public leadDados!: Lead;

  /* Filtros e mascaras */
  public maskPhone = '(00) 0 0000-0000';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
  ) {}

  ngOnInit(): void {
    this.urlCaminho = this.route.snapshot.routeConfig?.path;

    this.leadForm = this.formBuilder.group({
      tipoLead: [''],
      email: ['', Validators.email],
      nome: [''],
      telefone: [''],
      comentarios: [''],
      preferenciaDeContato: [''],
      tipoNegociacao: [''],
      categoriaImovel: [''],
      imoveis: [''],
    });

    this.leadQuery = this.apollo.watchQuery<any>({
      query: GQL_BUSCAR_UNICO_LEAD,
      variables: {
        _id: this.route.snapshot.paramMap.get('id'),
      },
    });

    this.querySubs = this.leadQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.leadForm.patchValue(data.lead);
      this.leadDados = data.lead;
    });
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  get getControl() {
    return this.leadForm.controls;
  }

  refresh(): void {
    this.leadQuery.refetch();
  }

  voltar() {
    this.router.navigate(['admin/leads']);
  }

  async onSubmit(): Promise<void> {
    const leadID = this.route.snapshot.paramMap.get('id');
    this.leadForm.value.imoveis = this.leadForm.value.imoveis._id;

    await this.gqlService
      .atualizaLead(leadID, this.leadForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log(`Sucesso`, res?.data);
          window.alert(`Lead Atualizado!!\nID: ${res?.data.updateLead.leadId}`);
          this.voltar();
        }
        if (res.errors) {
          console.log(`Erro: ${res?.errors[0]?.message}`);
          window.alert(`Erro ao atualizar Lead!!\n\n ${res.errors[0].message}`);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}

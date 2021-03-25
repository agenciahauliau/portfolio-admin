import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { GQL_BUSCAR_IMOVEL } from 'src/app/graphql/graphql';
import { Imovel } from 'src/app/helpers/types';
import { GraphQlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.scss', '../../admin.component.scss'],
})
export class EditarImovelComponent implements OnInit {
  form!: Imovel;
  imovelQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private gqlService: GraphQlService,
  ) {}

  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    this.imovelQuery = this.apollo.watchQuery<Imovel>({
      query: GQL_BUSCAR_IMOVEL,
      variables: {
        _id: imovelId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.imovelQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.form = data.imovel;
    });
  }

  onSubmit() {
    const imovelId = this.route.snapshot.paramMap.get('id');
    if (this.form.comodidadesImovel) {
      this.form.comodidadesImovel = this.separa(this.form.comodidadesImovel + '');
    }
    if (this.form.comodidadesCondominio) {
      this.form.comodidadesCondominio = this.separa(this.form.comodidadesCondominio + '');
    }
    console.log('form', this.form);
    this.gqlService.updateImovel(imovelId, this.form);
  }

  refresh() {
    this.imovelQuery.refetch();
  }

  voltar() {
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}

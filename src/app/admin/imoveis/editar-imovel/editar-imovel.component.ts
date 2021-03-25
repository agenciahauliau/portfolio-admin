import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { GQL_BUSCAR_IMOVEL } from 'src/app/graphql/graphql';
import { Imovel } from 'src/app/helpers/types';
import { GraphQlService } from 'src/app/services/graphql.service';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.scss', '../../admin.component.scss'],
})
<<<<<<< HEAD
export class EditarImovelComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faHome = faHome;

=======
export class EditarImovelComponent implements OnInit, OnDestroy {
>>>>>>> e4c844f29fb6a2b4289e40936ece05cc7e8fb8b6
  form: Imovel = {
    _id: '',
    categoriaImovel: '',
    jardins: false,
    descricaoImovel: '',
    tipoNegociacao: '',
    statusImovel: '',
    aceitaPermuta: false,
    mobiliado: false,
    valorImovel: 0,
    valorIPTU: 0,
    valorCondominio: 0,
    areaTotal: 0,
    areaConstruida: 0,
    andarImovel: 0,
    qtdeQuarto: 0,
    qtdeBanheiro: 0,
    qtdeSuites: 0,
    qtdeVagas: 0,
    nomeConstrutora: '',
    cep: 0,
    logradouro: '',
    numeroLogradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    comodidadesImovel: [''],
    comodidadesCondominio: [''],
  };
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
    this.gqlService.atualizaImovel(imovelId, this.form);
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { GQL_BUSCAR_IMOVEL } from 'src/app/graphql/graphql';
import { Imovel } from 'src/app/helpers/types';
import { GraphQlService } from 'src/app/services/graphql.service';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.scss', '../../admin.component.scss'],
})
export class EditarImovelComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  editaForm: Imovel = {
    _id: '',
    nomeImovel: '',
    categoriaImovel: '',
    jardins: false,
    descricaoImovel: '',
    tipoNegociacao: '',
    statusImovel: '',
    aceitaPermuta: false,
    mobiliado: false,
    valorImovel: 0,
    valorEntrada: 0,
    valorParcela: 0,
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
      this.editaForm = data.imovel;
    });
  }

  onSubmit() {
    const imovelId = this.route.snapshot.paramMap.get('id');
    if (this.editaForm.comodidadesImovel) {
      this.editaForm.comodidadesImovel = this.separa(this.editaForm.comodidadesImovel + '');
    }
    if (this.editaForm.comodidadesCondominio) {
      this.editaForm.comodidadesCondominio = this.separa(this.editaForm.comodidadesCondominio + '');
    }
    console.log(JSON.stringify(imovelId));
    console.log(imovelId);
    console.log(this.editaForm);
    this.gqlService.atualizaImovel(imovelId, this.editaForm);
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

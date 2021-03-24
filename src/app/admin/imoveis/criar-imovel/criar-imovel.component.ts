import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../../../services/graphql.service';
import { Imovel } from '../../../helpers/types';

@Component({
  selector: 'app-criar-imovel',
  templateUrl: './criar-imovel.component.html',
  styleUrls: ['./criar-imovel.component.scss'],
})
export class CriarImovelComponent implements OnInit {
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

  constructor(private gqlService: GraphQlService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.comodidadesImovel) {
      this.form.comodidadesImovel = this.separa(this.form.comodidadesImovel + '');
    }
    if (this.form.comodidadesCondominio) {
      this.form.comodidadesCondominio = this.separa(this.form.comodidadesCondominio + '');
    }
    console.log('form', this.form);
    this.gqlService.criarImovel(this.form);
  }

  //TODO: Verificar o pq que o array[0] não está sendo inserido no banco
  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}

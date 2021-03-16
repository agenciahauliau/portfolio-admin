export class User {
  _id?: string;
  username?: string;
  email?: string;
  senha?: string;
  nivel?: number;
  createdAt?: number;
  updatedAt?: number;
}

export class Imovel {
  _id?: string;
  categoriaImovel?: string;
  jardins?: boolean;
  descricaoImovel?: string;
  tipoNegociacao?: string;
  statusImovel?: string;
  aceitaPermuta?: boolean;
  mobiliado?: boolean;
  valorImovel?: number;
  valorIPTU?: number;
  valorCondominio?: number;
  areaTotal?: number;
  areaConstruida?: number;
  andarImovel?: number;
  qtdeQuarto?: number;
  qtdeBanheiro?: number;
  qtdeSuites?: number;
  qtdeVagas?: number;
  nomeConstrutora?: string;
  bairro?: string;
  logradouro?: string;
  numeroLogradouro?: string;
  complemento?: string;
  cep?: number;
  cidade?: string;
  uf?: string;
  comodidadesImovel?: [string];
  comodidadesCondominio?: [string];
  createdAt?: number;
  updatedAt?: number;
}

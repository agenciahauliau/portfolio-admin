export interface User {
  _id?: string;
  username?: string;
  email?: string;
  senha?: string;
  nivel?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface Imovel {
  _id?: string;
  nomeImovel?: string;
  categoriaImovel?: string;
  jardins?: boolean;
  descricaoImovel?: string;
  tipoNegociacao?: string;
  statusImovel?: string;
  aceitaPermuta?: boolean;
  mobiliado?: boolean;
  valorImovel?: number;
  valorEntrada?: number;
  valorParcela?: number;
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
  cep?: number;
  logradouro?: string;
  numeroLogradouro?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  comodidadesImovel?: [string];
  comodidadesCondominio?: [string];
  createdAt?: number;
  updatedAt?: number;
}

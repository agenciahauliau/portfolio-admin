export interface User {
  _id?: string;
  username?: string;
  email?: string;
  senha?: string;
  nivel?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface Tipologia {
  quartos?: number;
  suites?: number;
  tamanho?: number;
  valorEntrada?: number;
  valorParcela?: number;
}

export interface Lead {
  _id?: string;
  tipoLead?: string;
  nome?: string;
  email?: string;
  telefone?: number;
  comentarios?: string;
  preferenciaDeContato?: string;
  imoveis?: Imovel[] | string[];
  createdAt?: number;
  updatedAt?: number;
}

export interface Imovel {
  _id?: string;
  nomeImovel?: string;
  imagemPrincipal?: string;
  categoriaImovel?: string;
  jardins?: boolean;
  descricaoImovel?: string;
  tipoNegociacao?: string;
  statusLancamento?: string;
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
  bairro?: string;
  logradouro?: string;
  cep?: string;
  numeroLogradouro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  imagensAdicionais?: string[];
  imgPlantaCondominio?: string[];
  comodidadesImovel?: [string];
  comodidadesCondominio?: [string];
  galerias?: string[] | Galeria[];
  previsaoLancamento?: number;
  tipologias?: string[] | Tipologia[];
  createdAt?: number;
  updatedAt?: number;
}
export interface Galeria {
  _id?: string;
  nomeGaleria?: string;
  url?: [string];
  arquivoDestaque?: string;
  idImovel?: string[];
}

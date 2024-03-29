export interface User {
  _id?: string;
  username?: string;
  email?: string;
  senha?: string;
  nivel?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface File {
  _id?: string;
  fileId?: number;
  name?: string;
  tipo?: string;
  altText?: string;
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
  leadId?: number;
  tipoLead?: string;
  nome?: string;
  email?: string;
  telefone?: number;
  comentarios?: string;
  preferenciaDeContato?: string;
  tipoNegociacao?: string;
  categoriaImovel?: string;
  imoveis?: Imovel[];
  createdAt?: number;
  updatedAt?: number;
}

export interface Imovel {
  _id?: string;
  imovelId?: number;
  nomeImovel?: string;
  imagemPrincipal?: File[];
  categoriaImovel?: string;
  destaque?: boolean;
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
  nomeProprietario?: string;
  telefoneProprietario?: string;
  bairro?: string;
  logradouro?: string;
  cep?: string;
  numeroLogradouro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  galerias?: Galeria[];
  imgPlantaCondominio?: string[];
  comodidadesImovel?: [string];
  comodidadesCondominio?: [string];
  previsaoLancamento?: number;
  tipologias?: string[] | Tipologia[];
  createdAt?: number;
  updatedAt?: number;
}

export interface Galeria {
  tipoGaleria?: string;
  nomeGaleria?: string;
  arquivos?: [string];
  arquivoDestaque?: string;
}

export interface Post {
  _id?: string;
  postId?: number;
  status?: string;
  titulo?: string;
  descricao?: string;
  conteudo?: string;
  imagemPrincipal?: string;
  categoria?: string[];
  tags?: string[];
  createdAt?: number;
  updatedAt?: number;
}

export interface configuracao {
  _id?: string;
  configId?: number;
  tipo?: string;
  titulo?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
  telefone?: string;
  endereco?: string;
  arquivo?: File[];
  createdAt?: number;
  updatedAt?: number;
}

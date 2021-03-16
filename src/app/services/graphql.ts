import { gql } from 'apollo-angular';

export const GQL_LOGIN = gql`
  mutation login($email: String!, $senha: String!) {
    login(data: { email: $email, senha: $senha })
  }
`;

export const GQL_ME = gql`
  query me {
    me {
      _id
    }
  }
`;

export const GQL_CRIAR_IMOVEL = gql`
  mutation criarImovel(
    $categoriaImovel: String!
    $jardins: Boolean
    $descricaoImovel: String!
    $tipoNegociacao: String!
    $statusImovel: String!
    $aceitaPermuta: Boolean!
    $mobiliado: Boolean!
    $valorImovel: Number!
    $valorIPTU: Number!
    $valorCondominio: Number!
    $areaTotal: Number!
    $areaConstruida: Number!
    $andarImovel: Number
    $qtdeQuarto: Number!
    $qtdeBanheiro: Number!
    $qtdeSuites: Number!
    $qtdeVagas: Number!
    $nomeConstrutora: String!
    $bairro: String!
    $logradouro: String!
    $numeroLogradouro: String
    $complemento: String
    $cep: Number!
    $cidade: String!
    $uf: String!
    $comodidadesImovel: [String]
    $comodidadesCondominio: [String]
  ) {
    createImovel(
      dados: {
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorIPTU: $valorIPTU
        valorCondominio: $valorCondominio
        areaTotal: $areaTotal
        areaConstruida: $areaConstruida
        andarImovel: $andarImovel
        qtdeQuarto: $qtdeQuarto
        qtdeBanheiro: $qtdeBanheiro
        qtdeSuites: $qtdeSuites
        qtdeVagas: $qtdeVagas
        nomeConstrutora: $nomeConstrutora
        bairro: $bairro
        logradouro: $logradouro
        numeroLogradouro: $numeroLogradouro
        complemento: $complemento
        cep: $cep
        cidade: $cidade
        uf: $uf
        comodidadesImovel: $comodidadesImovel
        comodidadesCondominio: $comodidadesCondominio
      }
    ) {
      _id
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorIPTU
      valorCondominio
      areaTotal
      areaConstruida
      andarImovel
      qtdeQuarto
      qtdeBanheiro
      qtdeSuites
      qtdeVagas
      nomeConstrutora
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      comodidadesImovel
      comodidadesCondominio
      createdAt
      updatedAt
    }
  }
`;

export const GQL_IMOVEIS = gql`
  query imoveis {
    imoveis {
      _id
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorIPTU
      valorCondominio
      areaTotal
      areaConstruida
      andarImovel
      qtdeQuarto
      qtdeBanheiro
      qtdeSuites
      qtdeVagas
      nomeConstrutora
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      comodidadesImovel
      comodidadesCondominio
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_IMOVEL = gql`
  query imovel(
    $_id: String
    $categoriaImovel: String
    $jardins: Boolean
    $descricaoImovel: String
    $tipoNegociacao: String
    $statusImovel: String
    $aceitaPermuta: Boolean
    $mobiliado: Boolean
    $valorImovel: Number
    $valorIPTU: Number
    $valorCondominio: Number
    $areaTotal: Number
    $areaConstruida: Number
    $andarImovel: Number
    $qtdeQuarto: Number
    $qtdeBanheiro: Number
    $qtdeSuites: Number
    $qtdeVagas: Number
    $nomeConstrutora: String
    $bairro: String
    $logradouro: String
    $numeroLogradouro: String
    $complemento: String
    $cep: Number
    $cidade: String
    $uf: String
    $comodidadesImovel: [String]
    $comodidadesCondominio: [String]
  ) {
    imovel(
      dados: {
        _id: $_id
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorIPTU: $valorIPTU
        valorCondominio: $valorCondominio
        areaTotal: $areaTotal
        areaConstruida: $areaConstruida
        andarImovel: $andarImovel
        qtdeQuarto: $qtdeQuarto
        qtdeBanheiro: $qtdeBanheiro
        qtdeSuites: $qtdeSuites
        qtdeVagas: $qtdeVagas
        nomeConstrutora: $nomeConstrutora
        bairro: $bairro
        logradouro: $logradouro
        numeroLogradouro: $numeroLogradouro
        complemento: $complemento
        cep: $cep
        cidade: $cidade
        uf: $uf
        comodidadesImovel: $comodidadesImovel
        comodidadesCondominio: $comodidadesCondominio
      }
    ) {
      _id
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorIPTU
      valorCondominio
      areaTotal
      areaConstruida
      andarImovel
      qtdeQuarto
      qtdeBanheiro
      qtdeSuites
      qtdeVagas
      nomeConstrutora
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      comodidadesImovel
      comodidadesCondominio
      createdAt
      updatedAt
    }
  }
`;

export const GQL_REMOVE_IMOVEL = gql`
  mutation removeImovel($_id: String!) {
    removeImovel(id: $_id)
  }
`;

export const GQL_UPDATE_IMOVEL = gql`
  mutation updateImovel(
    $_id: String!
    $categoriaImovel: String
    $jardins: Boolean
    $descricaoImovel: String
    $tipoNegociacao: String
    $statusImovel: String
    $aceitaPermuta: Boolean
    $mobiliado: Boolean
    $valorImovel: Number
    $valorIPTU: Number
    $valorCondominio: Number
    $areaTotal: Number
    $areaConstruida: Number
    $andarImovel: Number
    $qtdeQuarto: Number
    $qtdeBanheiro: Number
    $qtdeSuites: Number
    $qtdeVagas: Number
    $nomeConstrutora: String
    $bairro: String
    $logradouro: String
    $numeroLogradouro: String
    $complemento: String
    $cep: Number
    $cidade: String
    $uf: String
    $comodidadesImovel: [String]
    $comodidadesCondominio: [String]
  ) {
    updateImovel(
      id: $_id
      dados: {
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorIPTU: $valorIPTU
        valorCondominio: $valorCondominio
        areaTotal: $areaTotal
        areaConstruida: $areaConstruida
        andarImovel: $andarImovel
        qtdeQuarto: $qtdeQuarto
        qtdeBanheiro: $qtdeBanheiro
        qtdeSuites: $qtdeSuites
        qtdeVagas: $qtdeVagas
        nomeConstrutora: $nomeConstrutora
        bairro: $bairro
        logradouro: $logradouro
        numeroLogradouro: $numeroLogradouro
        complemento: $complemento
        cep: $cep
        cidade: $cidade
        uf: $uf
        comodidadesImovel: $comodidadesImovel
        comodidadesCondominio: $comodidadesCondominio
      }
    ) {
      _id
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorIPTU
      valorCondominio
      areaTotal
      areaConstruida
      andarImovel
      qtdeQuarto
      qtdeBanheiro
      qtdeSuites
      qtdeVagas
      nomeConstrutora
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      comodidadesImovel
      comodidadesCondominio
      createdAt
      updatedAt
    }
  }
`;

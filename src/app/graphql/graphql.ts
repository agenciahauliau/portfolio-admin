import { gql } from 'apollo-angular';

export const GQL_LOGIN = gql`
  mutation login($email: String!, $senha: String!) {
    login(data: { email: $email, senha: $senha })
  }
`;

export const GQL_UPLOAD_IMG = gql`
  mutation upload($file: Upload!) {
    uploadFileRemoto(file: $file)
  }
`;

export const GQL_PESQ_GALERIA = gql`
  query procurarUmaGaleria(
    $id: ID
    $idImovel: [String!]
    $nomeGaleria: String
    $url: [String!]
    $arquivoDestaque: String
  ) {
    galeria(
      dados: {
        _id: $id
        nomeGaleria: $nomeGaleria
        url: $url
        idImovel: $idImovel
        arquivoDestaque: $arquivoDestaque
      }
    ) {
      _id
      nomeGaleria
      url
      arquivoDestaque
      idImovel
    }
  }
`;

export const GQL_CRIA_GALERIA = gql`
  mutation criarGaleria(
    $idImovel: [String!]!
    $nomeGaleria: String!
    $url: [String!]!
    $arquivoDestaque: String!
  ) {
    createGaleria(
      dados: {
        idImovel: $idImovel
        nomeGaleria: $nomeGaleria
        url: $url
        arquivoDestaque: $arquivoDestaque
      }
    ) {
      _id
      nomeGaleria
      url
      arquivoDestaque
    }
  }
`;

export const GQL_ATUALIZA_GALERIA = gql`
  mutation atualizarGaleria(
    $id: String!
    $idImovel: [String!]
    $nomeGaleria: String
    $arquivoDestaque: String
    $url: [String!]
  ) {
    updateGaleria(
      id: $id
      dados: {
        nomeGaleria: $nomeGaleria
        url: $url
        arquivoDestaque: $arquivoDestaque
        idImovel: $idImovel
      }
    ) {
      _id
      nomeGaleria
      url
      arquivoDestaque
      idImovel
    }
  }
`;

export const GQL_EXIBE_MIDIAS = gql`
  query arquivos {
    listarUploads
  }
`;

export const GQL_LISTA_ARQUIVOS = gql`
  query listarUploads {
    listarUploads
  }
`;

export const GQL_EXIBE_GALERIAS = gql`
  query listaGalerias {
    galerias {
      _id
      nomeGaleria
      url
    }
  }
`;

export const GQL_DELETA_GALERIA = gql`
  mutation deletarGaleria($id: String!) {
    removeGaleria(id: $id)
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
    $nomeImovel: String!
    $categoriaImovel: String!
    $jardins: Boolean!
    $descricaoImovel: String!
    $tipoNegociacao: String!
    $statusImovel: String!
    $aceitaPermuta: Boolean!
    $mobiliado: Boolean!
    $valorImovel: Float!
    $valorEntrada: Float!
    $valorParcela: Float!
    $valorIPTU: Float!
    $valorCondominio: Float!
    $areaTotal: Float!
    $areaConstruida: Float!
    $andarImovel: Int!
    $qtdeQuarto: Int!
    $qtdeBanheiro: Int!
    $qtdeSuites: Int!
    $qtdeVagas: Int!
    $nomeConstrutora: String!
    $bairro: String!
    $logradouro: String!
    $numeroLogradouro: String!
    $complemento: String!
    $cep: Int!
    $cidade: String!
    $uf: String!
    $comodidadesImovel: [String!]!
    $comodidadesCondominio: [String!]!
  ) {
    createImovel(
      dados: {
        nomeImovel: $nomeImovel
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorEntrada: $valorEntrada
        valorParcela: $valorParcela
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
      nomeImovel
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorEntrada
      valorParcela
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
      valorEntrada
      valorParcela
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

export const GQL_IMOVEIS_COM_FILTRO = gql`
  query imoveis_com_filtro(
    $_id: ID
    $nomeImovel: String
    $categoriaImovel: String
    $jardins: Boolean
    $descricaoImovel: String
    $tipoNegociacao: String
    $statusImovel: String
    $aceitaPermuta: Boolean
    $mobiliado: Boolean
    $valorImovel: Float
    $valorEntrada: Float
    $valorParcela: Float
    $valorIPTU: Float
    $valorCondominio: Float
    $areaTotal: Float
    $areaConstruida: Float
    $andarImovel: Float
    $qtdeQuarto: Float
    $qtdeBanheiro: Float
    $qtdeSuites: Float
    $qtdeVagas: Float
    $nomeConstrutora: String
    $bairro: String
    $logradouro: String
    $numeroLogradouro: String
    $complemento: String
    $cep: Float
    $cidade: String
    $uf: String
    $comodidadesImovel: [String]
    $comodidadesCondominio: [String]
    $quantidade: Float
  ) {
    imoveis(
      filtros: {
        _id: $_id
        nomeImovel: $nomeImovel
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorEntrada: $valorEntrada
        valorParcela: $valorParcela
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
      quantidade: $quantidade
    ) {
      _id
      nomeImovel
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorEntrada
      valorParcela
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
    $_id: ID
    $nomeImovel: String
    $categoriaImovel: String
    $jardins: Boolean
    $descricaoImovel: String
    $tipoNegociacao: String
    $statusImovel: String
    $aceitaPermuta: Boolean
    $mobiliado: Boolean
    $valorImovel: Float
    $valorEntrada: Float
    $valorParcela: Float
    $valorIPTU: Float
    $valorCondominio: Float
    $areaTotal: Float
    $areaConstruida: Float
    $andarImovel: Float
    $qtdeQuarto: Float
    $qtdeBanheiro: Float
    $qtdeSuites: Float
    $qtdeVagas: Float
    $nomeConstrutora: String
    $bairro: String
    $logradouro: String
    $numeroLogradouro: String
    $complemento: String
    $cep: Float
    $cidade: String
    $uf: String
    $comodidadesImovel: [String!]
    $comodidadesCondominio: [String!]
  ) {
    imovel(
      dados: {
        _id: $_id
        nomeImovel: $nomeImovel
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        aceitaPermuta: $aceitaPermuta
        mobiliado: $mobiliado
        valorImovel: $valorImovel
        valorEntrada: $valorEntrada
        valorParcela: $valorParcela
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
      nomeImovel
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorEntrada
      valorParcela
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
    $nomeImovel: String
    $categoriaImovel: String
    $jardins: Boolean
    $descricaoImovel: String
    $tipoNegociacao: String
    $statusImovel: String
    $aceitaPermuta: Boolean
    $mobiliado: Boolean
    $valorImovel: Float
    $valorEntrada: Float
    $valorParcela: Float
    $valorIPTU: Float
    $valorCondominio: Float
    $areaTotal: Float
    $areaConstruida: Float
    $andarImovel: Float
    $qtdeQuarto: Float
    $qtdeBanheiro: Float
    $qtdeSuites: Float
    $qtdeVagas: Float
    $nomeConstrutora: String
    $bairro: String
    $logradouro: String
    $numeroLogradouro: String
    $complemento: String
    $cep: Float
    $cidade: String
    $uf: String
    $comodidadesImovel: [String!]
    $comodidadesCondominio: [String!]
  ) {
    updateImovel(
      id: $_id
      dados: {
        nomeImovel: $nomeImovel
        categoriaImovel: $categoriaImovel
        jardins: $jardins
        descricaoImovel: $descricaoImovel
        tipoNegociacao: $tipoNegociacao
        statusImovel: $statusImovel
        valorEntrada: $valorEntrada
        valorParcela: $valorParcela
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
      nomeImovel
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusImovel
      aceitaPermuta
      mobiliado
      valorImovel
      valorEntrada
      valorParcela
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

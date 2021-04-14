import { gql } from 'apollo-angular';

export const GQL_LOGIN = gql`
  mutation login($email: String!, $senha: String!) {
    login(data: { email: $email, senha: $senha })
  }
`;

export const GQL_CHECK = gql`
  query check {
    check
  }
`;

export const GQL_ENVIA_ARQUIVO = gql`
  mutation upload($file: Upload!) {
    uploadFileRemoto(file: $file)
  }
`;

export const GQL_LISTAR_ARQUIVOS = gql`
  query arquivos {
    listarUploads
  }
`;

export const GQL_DELETA_ARQUIVO = gql`
  mutation deletarArquivo($nome: String!) {
    deletaArquivo(filename: $nome)
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
  mutation criarImovel($input: CreateImovelInput!) {
    createImovel(dados: $input) {
      _id
      nomeImovel
      imagemPrincipal
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusLancamento
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
      imagensAdicionais
      imgPlantaCondominio
      comodidadesImovel
      comodidadesCondominio
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      previsaoLancamento
      tipologias {
        quartos
        suites
        tamanho
        valorEntrada
        valorParcela
      }
      createdAt
    }
  }
`;

export const GQL_LISTAR_IMOVEIS = gql`
  query imoveis {
    imoveis {
      _id
      nomeImovel
      imagemPrincipal
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusLancamento
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
      imagensAdicionais
      imgPlantaCondominio
      comodidadesImovel
      comodidadesCondominio
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      previsaoLancamento
      tipologias {
        quartos
        suites
        tamanho
        valorEntrada
        valorParcela
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_IMOVEIS_COM_FILTRO = gql`
  query imoveis_com_filtro($input: SearchImovelInput, $quantidade: Float) {
    imoveis(filtros: $input, quantidade: $quantidade) {
      _id
      nomeImovel
      imagemPrincipal
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusLancamento
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
      imagensAdicionais
      imgPlantaCondominio
      comodidadesImovel
      comodidadesCondominio
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      previsaoLancamento
      tipologias {
        quartos
        suites
        tamanho
        valorEntrada
        valorParcela
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_IMOVEL = gql`
  query imovel($_id: ID!) {
    imovel(dados: { _id: $_id }) {
      _id
      nomeImovel
      imagemPrincipal
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusLancamento
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
      imagensAdicionais
      imgPlantaCondominio
      comodidadesImovel
      comodidadesCondominio
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      previsaoLancamento
      tipologias {
        quartos
        suites
        tamanho
        valorEntrada
        valorParcela
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_DELETA_IMOVEL = gql`
  mutation removeImovel($_id: String!) {
    removeImovel(id: $_id)
  }
`;

export const GQL_ATUALIZA_IMOVEL = gql`
  mutation updateImovel($_id: String!, $input: UpdateImovelInput!) {
    updateImovel(id: $_id, dados: $input) {
      _id
      nomeImovel
      imagemPrincipal
      categoriaImovel
      jardins
      descricaoImovel
      tipoNegociacao
      statusLancamento
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
      imagensAdicionais
      imgPlantaCondominio
      comodidadesImovel
      comodidadesCondominio
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      previsaoLancamento
      tipologias {
        quartos
        suites
        tamanho
        valorEntrada
        valorParcela
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_CRIAR_LEAD = gql`
  mutation createLead($input: CreateLeadInput!) {
    createLead(dados: $input)
  }
`;

export const GQL_LISTAR_LEADS = gql`
  query listarLeads {
    leads {
      _id
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populate: true) {
        _id
        nomeImovel
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_DELETA_LEAD = gql`
  mutation deletaImovel($_id: String!) {
    removeImovel(id: $_id)
  }
`;

export const GQL_ATUALIZA_LEAD = gql`
  mutation updateLead($id: String!, $input: UpdateLeadInput!) {
    updateLead(id: $id, dados: $input) {
      _id
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populate: true) {
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCA_UNICO_LEAD = gql`
  query lead($input: SearchLeadInput!) {
    lead(dados: $input) {
      _id
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populate: true) {
        _id
        nomeImovel
      }
      createdAt
      updatedAt
    }
  }
`;

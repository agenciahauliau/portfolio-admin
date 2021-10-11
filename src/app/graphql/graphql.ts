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
      imovelId
      nomeImovel
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoriaImovel
      destaque
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
      nomeProprietario
      telefoneProprietario
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      imgPlantaCondominio(populateImgCondominio: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      comodidadesImovel
      comodidadesCondominio
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

export const GQL_LISTAR_IMOVEIS = gql`
  query imoveis {
    imoveis {
      _id
      imovelId
      nomeImovel
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoriaImovel
      jardins
      destaque
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
      nomeProprietario
      telefoneProprietario
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      imgPlantaCondominio(populateImgCondominio: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      comodidadesImovel
      comodidadesCondominio
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
      imovelId
      nomeImovel
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoriaImovel
      jardins
      destaque
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
      nomeProprietario
      telefoneProprietario
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      imgPlantaCondominio(populateImgCondominio: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      comodidadesImovel
      comodidadesCondominio
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
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
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
      nomeProprietario
      telefoneProprietario
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      imgPlantaCondominio(populateImgCondominio: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      comodidadesImovel
      comodidadesCondominio
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
      imovelId
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
      imovelId
      nomeImovel
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoriaImovel
      jardins
      destaque
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
      nomeProprietario
      telefoneProprietario
      bairro
      logradouro
      numeroLogradouro
      complemento
      cep
      cidade
      uf
      galerias {
        tipoGaleria
        nomeGaleria
        arquivos
        arquivoDestaque
      }
      imgPlantaCondominio(populateImgCondominio: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      comodidadesImovel
      comodidadesCondominio
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
      leadId
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populateImoveis: true) {
        _id
        imovelId
        nomeImovel
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_DELETA_LEAD = gql`
  mutation deletaLead($id: String!) {
    removeLead(id: $id)
  }
`;

export const GQL_ATUALIZA_LEAD = gql`
  mutation updateLead($id: String!, $input: UpdateLeadInput!) {
    updateLead(id: $id, dados: $input) {
      _id
      leadId
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populateImoveis: true) {
        _id
        imovelId
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_UNICO_LEAD = gql`
  query lead($_id: ID!) {
    lead(dados: { _id: $_id }) {
      _id
      leadId
      tipoLead
      nome
      email
      telefone
      comentarios
      preferenciaDeContato
      imoveis(populateImoveis: true) {
        _id
        imovelId
        nomeImovel
      }
      createdAt
      updatedAt
    }
  }
`;

export const GQL_CRIAR_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(dados: $input) {
      _id
      postId
      status
      titulo
      descricao
      conteudo
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoria
      tags
      createdAt
    }
  }
`;

export const GQL_ATUALIZA_POST = gql`
  mutation updatePost($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, dados: $input) {
      _id
      postId
      status
      titulo
      descricao
      conteudo
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoria
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GQL_LISTAR_POSTS = gql`
  query todosPosts {
    posts {
      _id
      postId
      status
      titulo
      descricao
      conteudo
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoria
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_POSTS_COM_FILTRO = gql`
  query filtrarPosts($filtros: SearchPostCondInput, $qtde: Float) {
    posts(filtros: $filtros, quantidade: $qtde) {
      _id
      postId
      status
      titulo
      descricao
      conteudo
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoria
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GQL_BUSCAR_POST = gql`
  query post($id: String!) {
    post(id: $id) {
      _id
      postId
      status
      titulo
      descricao
      conteudo
      imagemPrincipal(populateImgPrincipal: true) {
        _id
        fileId
        name
        tipo
        altText
        createdAt
        updatedAt
      }
      categoria
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GQL_DELETA_POST = gql`
  mutation deletaPost($id: String!) {
    removePost(id: $id)
  }
`;

export const GQL_BUSCAR_FILE = gql`
  query SingleFile($fileDados: SearchFileInput!) {
    file(dados: $fileDados) {
      _id
      fileId
      name
      tipo
      altText
      createdAt
      updatedAt
    }
  }
`;

export const GQL_LISTAR_FILES = gql`
  query Files {
    files {
      _id
      fileId
      name
      tipo
      altText
      createdAt
      updatedAt
    }
  }
`;

export const GQL_ATUALIZA_FILE = gql`
  mutation updateFile($input: UpdateFileInput!, $_id: String!) {
    updateFile(dados: $input, id: $_id) {
      _id
      fileId
      name
      tipo
      altText
      createdAt
      updatedAt
    }
  }
`;

// export const GQL_CONFIGURACOES = gql`
//   query configuracoes(filtros: SearchConfiguracaoInput) {
//     configuracao {
//       _id
//       configId
//       tipo
//       titulo
//       instagram
//       facebook
//       linkedin
//       whatsapp
//       telefone
//       endereco
//       arquivo(populateImgPrincipal: true) {
//         _id
//         fileId
//         name
//         tipo
//         altText
//         createdAt
//         updatedAt
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { UploadService } from 'src/app/services/upload.service';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_FILE, GQL_LISTAR_IMOVEIS } from '../../../graphql/graphql';
import { File, Imovel } from '../../../helpers/types';
import { environment } from '../../../../environments/environment';
import { GraphQlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-exibir-arquivo',
  templateUrl: './exibir-arquivo.component.html',
  styleUrls: ['./exibir-arquivo.component.scss', '../../assets/admin.component.scss'],
})
export class ExibirArquivoComponent implements OnInit, OnDestroy {
  url = `${environment.API}files/`;
  file!: File;
  imoveis!: Imovel[];
  fileQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    private gqlService: GraphQlService,
  ) {}

  /**
   * Assim que o componente é acessado, o angular
   * inicia o método ngOnInit() buscando pelo
   * arquivo no graphql
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fileQuery = this.apollo.watchQuery<File>({
      query: GQL_BUSCAR_FILE,
      variables: {
        fileDados: {
          _id: id,
        },
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.fileQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.file = data.file;
    });

    //TODO: fazer com que o serviço liste qual imóvel/post/configuração está relacionado ao arquivo
    /* this.querySubs = this.apollo
      .watchQuery<any>({ query: GQL_LISTAR_IMOVEIS })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.imoveis = [...data.imoveis];
      }); */
  }

  editarFile(fileId: any) {
    this.router.navigate(['admin/editar-arquivo', fileId]);
  }

  refresh() {
    this.fileQuery.refetch();
  }

  voltar() {
    this.router.navigate(['admin/biblioteca']);
  }

  /**
   * Ao sair do componente, o método ngOnDestroy()
   * é chamado para desinscrever o querySubs
   * para não ficar consumindo recursos
   * desnecessários.
   */
  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  /**
   * Função para remover o arquivo e voltar à página anterior
   * @param name É o nome do arquivo. Exemplo: 'arquivo.jpg'
   */
  async remover(name: any) {
    if (confirm(`Têm certeza que quer deletar?`)) {
      await this.uploadService.deletaArquivo(name);
      this.router.navigate(['admin/biblioteca']);
    } else {
      this.refresh();
    }
  }
}

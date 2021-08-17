import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphQlService } from 'src/app/services/graphql.service';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_IMOVEL } from '../../../graphql/graphql';
import { Imovel } from '../../../helpers/types';

@Component({
  selector: 'app-exibir-imovel',
  templateUrl: './exibir-imovel.component.html',
  styleUrls: ['./exibir-imovel.component.scss', '../../assets/admin.component.scss'],
})
export class ExibirImovelComponent implements OnInit, OnDestroy {
  imovel!: Imovel;
  imovelQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private gqlService: GraphQlService,
    ) {}

  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    this.imovelQuery = this.apollo.watchQuery<Imovel>({
      query: GQL_BUSCAR_IMOVEL,
      variables: {
        _id: imovelId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.imovelQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.imovel = data.imovel;

      console.log(data.imovel)
    });
  }

  refresh() {
    this.imovelQuery.refetch();
  }

  editarImovel(imovelId: any) {
    this.router.navigate(['admin/editar-imovel', imovelId]);
  }

  voltar() {
    this.router.navigate(['admin/imoveis']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  async atualizaStatus(id: unknown, event: any) {
    const status = { statusLancamento: event.target.value };
    console.log(event);
    if (confirm(`Confirma alteração para "${event.target.value}" ?`)) {
      await this.gqlService
        .atualizaImovel(id, status)
        .then((res: any) => {
          if (res.data) {
            console.log('Sucesso', res?.data?.updateImovel?.statusLancamento);
          }
          if (res.errors) {
            console.log('Erro', res?.errors[0]?.message);
            window.alert(`Erro: ${res.errors[0].message}`);
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true });
    }
  }

  async remover(id: any) {
    if (confirm(`Têm certeza que quer deletar?`)) {
      await this.gqlService.deletarPost(id);
      this.router.navigate(['admin/imoveis']);
    } else {
      this.refresh();
    }
  }
}
